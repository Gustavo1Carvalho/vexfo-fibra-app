import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Section = ({
  title,
  action,
  children,
  className,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) => (
  <section className={cn("space-y-3", className)}>
    <div className="flex items-center justify-between gap-3 px-1">
      <h2 className="font-display text-[15px] font-bold text-deep">{title}</h2>
      {action}
    </div>
    {children}
  </section>
);
