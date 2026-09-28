import type { ReactNode } from "react";
import { Inbox, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

/** Estado vazio padrão do app (ex.: "Você não possui faturas em aberto."). */
export const EmptyState = ({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) => (
  <div
    className={cn(
      "animate-fade-up flex flex-col items-center justify-center rounded-app border border-dashed border-border bg-card/70 px-6 py-8 text-center",
      className,
    )}
  >
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
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
