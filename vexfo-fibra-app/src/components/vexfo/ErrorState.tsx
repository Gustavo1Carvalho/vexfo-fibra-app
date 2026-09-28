import type { ReactNode } from "react";
import { TriangleAlert, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

/** Estado de erro padrão do app, sempre com um caminho de recuperação. */
export const ErrorState = ({
  icon: Icon = TriangleAlert,
  title,
  description,
  action,
  className,
}: ErrorStateProps) => (
  <div
    className={cn(
      "animate-fade-up flex flex-col items-center justify-center rounded-app border border-destructive/25 bg-destructive/5 px-6 py-8 text-center",
      className,
    )}
  >
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
      <Icon className="h-7 w-7" strokeWidth={1.8} />
    </span>
    <p className="mt-3 font-display text-sm font-bold text-deep">{title}</p>
    {description ? (
      <p className="mt-1 max-w-[15rem] text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
    ) : null}
    {action ? <div className="mt-4">{action}</div> : null}
  </div>
);
