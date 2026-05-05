import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { BriefingSchema } from "@/lib/briefing-schema";
import type { Briefing } from "@/lib/briefing-schema";

// ── Rate limit — in-memory, 3 submissões por IP por hora ──────────────────
// Para multi-instância em produção, substituir por Upstash Redis.
const ipLimits = new Map<string, { count: number; resetAt: number }>();
const MAX_PER_HOUR = 3;
const HOUR_MS = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipLimits.get(ip);
  if (!record || record.resetAt < now) {
    ipLimits.set(ip, { count: 1, resetAt: now + HOUR_MS });
    return true;
  }
  if (record.count >= MAX_PER_HOUR) return false;
  record.count++;
  return true;
}

// ── Label maps ────────────────────────────────────────────────────────────
const TIPO: Record<Briefing["tipo"], string> = {
  landing: "Landing page",
  institucional: "Site institucional",
  ecommerce: "E-commerce",
  sistema: "Sistema custom",
  outro: "Outro",
};

const ORCAMENTO: Record<Briefing["orcamento"], string> = {
  ate5k: "Até R$ 5k",
  "5a10k": "R$ 5k – 10k",
  "10a20k": "R$ 10k – 20k",
  acima20k: "Acima de R$ 20k",
  naoseiorcamento: "Ainda não sei",
};

const PRAZO: Record<Briefing["prazo"], string> = {
  urgente: "Urgente (7 dias)",
  "1a2meses": "1–2 meses",
  "3maismeses": "3+ meses",
  flexivel: "Flexível",
};

// ── Email HTML ─────────────────────────────────────────────────────────────
function buildEmail(data: Briefing): string {
  const now = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e8e4dc;width:140px;
                 font-family:monospace;font-size:11px;text-transform:uppercase;
                 letter-spacing:.06em;color:#8a857c;vertical-align:top;">
        ${label}
      </td>
      <td style="padding:10px 0 10px 16px;border-bottom:1px solid #e8e4dc;
                 font-size:15px;color:#131210;vertical-align:top;">
        ${value}
      </td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f1ea;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">

    <!-- Header -->
    <div style="background:#0a0a0a;padding:24px 32px;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:26px;color:#f4f1ea;letter-spacing:-.02em;">
        Kodus<span style="color:#ff5b1f;">.</span>
      </span>
      <span style="font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#6b665d;">
        Novo briefing
      </span>
    </div>

    <!-- Body -->
    <div style="padding:32px;">
      <p style="margin:0 0 6px;font-size:20px;font-weight:600;color:#131210;">
        ${data.nome} quer falar.
      </p>
      <p style="margin:0 0 28px;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#8a857c;">
        ${now} · São Paulo
      </p>

      <table style="width:100%;border-collapse:collapse;">
        ${row("Nome", data.nome)}
        ${row("Email", `<a href="mailto:${data.email}" style="color:#ff5b1f;text-decoration:none;">${data.email}</a>`)}
        ${row("WhatsApp", `<a href="https://wa.me/55${data.whatsapp}" style="color:#ff5b1f;text-decoration:none;">${data.whatsapp}</a>`)}
        ${data.empresa ? row("Empresa", data.empresa) : ""}
        ${row("Projeto", TIPO[data.tipo])}
        ${row("Orçamento", ORCAMENTO[data.orcamento])}
        ${row("Prazo", PRAZO[data.prazo])}
      </table>

      <!-- CTA -->
      <div style="margin-top:28px;padding-top:24px;border-top:1px solid #e8e4dc;">
        <a href="mailto:${data.email}"
           style="display:inline-block;background:#ff5b1f;color:#fff;text-decoration:none;
                  padding:12px 24px;border-radius:999px;font-size:14px;font-weight:500;">
          Responder agora →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:16px 32px;background:#f9f6ef;border-top:1px solid #e8e4dc;">
      <p style="margin:0;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#8a857c;">
        Kodus Estúdio Digital · São Paulo, SP
      </p>
    </div>

  </div>
</body>
</html>`;
}

// ── Handler ────────────────────────────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  // Rate limit
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente em 1 hora." },
      { status: 429 }
    );
  }

  // Parse + validate
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "invalid body" }, { status: 400 });

  const result = BriefingSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }

  const data = result.data;
  console.log("[contact] Briefing recebido:", data);

  // Send email
  const to = process.env.RESEND_CONTACT_EMAIL ?? "gapdmm@gmail.com";
  const { error } = await resend.emails.send({
    from: "Kodus <onboarding@resend.dev>",
    to,
    replyTo: data.email,
    subject: `Novo briefing — ${data.nome} (${TIPO[data.tipo]})`,
    html: buildEmail(data),
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ error: "Falha ao enviar email." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
