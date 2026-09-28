import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type QuickActionAccent = "blue" | "cyan" | "green" | "navy";

const ACCENTS: Record<QuickActionAccent, string> = {
  blue: "bg-primary/10 text-primary",
  cyan: "bg-accent/20 text-primary",
  green: "bg-success/20 text-success-foreground",
  navy: "bg-deep/10 text-deep",
};

interface QuickActionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  accent?: QuickActionAccent;
  /** Usado apenas para escalonar a animação de entrada do grid. */
  index?: number;
}

export const QuickAction = ({
  icon: Icon,
  title,
  description,
  to,
  accent = "blue",
  index = 0,
}: QuickActionProps) => (
  <Link
    to={to}
    style={{ animationDelay: `${Math.min(index, 6) * 45}ms` }}
    className="pressable animate-fade-up flex flex-col gap-3 rounded-app border border-border/60 bg-card p-4 shadow-card"
  >
    <span
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-2xl",
        ACCENTS[accent],
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={2.2} />
    </span>
    <span className="min-w-0">
      <span className="block truncate text-[13px] font-bold text-deep">
        {title}
      </span>
      <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
        {description}
      </span>
    </span>
  </Link>
);
