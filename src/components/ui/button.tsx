import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type BtnProps = React.ComponentProps<"button">;

export const BtnPrimary = forwardRef<HTMLButtonElement, BtnProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3",
        "text-sm font-medium text-white",
        "transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-[0_12px_30px_-8px_var(--accent)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
BtnPrimary.displayName = "BtnPrimary";

export const BtnGhost = forwardRef<HTMLButtonElement, BtnProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--line-strong)] bg-transparent px-6 py-3",
        "text-sm font-medium text-[var(--fg)]",
        "transition-colors duration-200 hover:bg-[var(--bg-2)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg-mute)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
BtnGhost.displayName = "BtnGhost";
