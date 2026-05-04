import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = React.ComponentProps<"span">;

export const Eyebrow = forwardRef<HTMLSpanElement, EyebrowProps>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn("eyebrow", className)} {...props} />
  )
);
Eyebrow.displayName = "Eyebrow";
