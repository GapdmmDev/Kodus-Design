import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = React.ComponentProps<"div">;

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mx-auto w-full max-w-[1440px] px-8 max-md:px-5", className)}
      {...props}
    />
  )
);
Container.displayName = "Container";
