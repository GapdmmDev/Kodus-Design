import { z } from "zod";

export const StepSchema1 = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  email: z
    .string()
    .min(1, "Email obrigatório")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido"),
  whatsapp: z
    .string()
    .min(1, "WhatsApp obrigatório")
    .regex(/^\d{10,}$/, "Só dígitos, mínimo 10"),
  empresa: z.string(),
});

export const StepSchema2 = z.object({
  tipo: z.enum(
    ["landing", "institucional", "ecommerce", "sistema", "outro"],
    { errorMap: () => ({ message: "Selecione o tipo de projeto" }) }
  ),
});

export const StepSchema3 = z.object({
  orcamento: z.enum(
    ["ate5k", "5a10k", "10a20k", "acima20k", "naoseiorcamento"],
    { errorMap: () => ({ message: "Selecione uma faixa de orçamento" }) }
  ),
  prazo: z.enum(
    ["urgente", "1a2meses", "3maismeses", "flexivel"],
    { errorMap: () => ({ message: "Selecione um prazo estimado" }) }
  ),
});

export const BriefingSchema = StepSchema1.merge(StepSchema2).merge(StepSchema3);

export type Step1Data = z.infer<typeof StepSchema1>;
export type Step2Data = z.infer<typeof StepSchema2>;
export type Step3Data = z.infer<typeof StepSchema3>;
export type Briefing = z.infer<typeof BriefingSchema>;
