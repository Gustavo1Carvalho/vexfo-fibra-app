import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusTone =
  | "success"
  | "warning"
  | "primary"
  | "neutral"
  | "danger";

const TONES: Record<StatusTone, string> = {
  success: "bg-success/15 text-success-foreground border-success/30",
  warning: "bg-warning/15 text-warning-foreground border-warning/30",
  primary: "bg-primary/10 text-primary border-primary/25",
  neutral: "bg-muted text-muted-foreground border-border",
  danger: "bg-destructive/10 text-destructive border-destructive/25",
};

interface StatusBadgeProps {
  tone: StatusTone;
  label: string;
  icon?: LucideIcon;
  className?: string;
}

export const StatusBadge = ({
  tone,
  label,
  icon: Icon,
  className,
}: StatusBadgeProps) => (
  <span
    className={cn(
      "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold",
      TONES[tone],
      className,
    )}
  >
    {Icon ? <Icon className="h-3.5 w-3.5" strokeWidth={2.6} /> : null}
    {label}
  </span>
);
