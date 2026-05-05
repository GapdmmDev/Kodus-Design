import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoMarkProps {
  /** "sm" = nav size (20px icon), "lg" = footer size (36px icon) */
  size?: "sm" | "lg";
  /** Show orange dot after "Kodus" */
  dot?: boolean;
  className?: string;
}

export function LogoMark({ size = "sm", dot = false, className }: LogoMarkProps) {
  // SVG intrinsic: 571 × 220. Derive width from target height.
  const h = size === "lg" ? 36 : 20;
  const w = Math.round(h * (571 / 220));
  const textSize = size === "lg" ? "text-[36px]" : "text-xl";

  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/logo.svg"
        alt=""
        width={w}
        height={h}
        aria-hidden="true"
        priority={size === "sm"}
      />
      <span
        className={cn("leading-none text-[var(--fg)]", textSize)}
        style={{ fontFamily: "var(--font-manrope)", fontWeight: 700 }}
      >
        Kodus
        {dot && (
          <span style={{ color: "var(--accent)" }}>.</span>
        )}
      </span>
    </span>
  );
}
