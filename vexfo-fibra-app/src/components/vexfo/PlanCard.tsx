import { ArrowDown, ArrowUp } from "lucide-react";
import { Card } from "@/components/vexfo/Card";
import { StatusBadge } from "@/components/vexfo/StatusBadge";
import { formatCurrency } from "@/lib/format";
import type { Plan } from "@/data";

const SpeedTile = ({
  direction,
  value,
  label,
}: {
  direction: "down" | "up";
  value: number;
  label: string;
}) => {
  const Icon = direction === "down" ? ArrowDown : ArrowUp;
  const tone =
    direction === "down"
      ? "bg-primary/10 text-primary"
      : "bg-accent/15 text-deep";

  return (
    <div className="rounded-2xl bg-muted px-3.5 py-3">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-xl ${tone}`}
      >
        <Icon className="h-4 w-4" strokeWidth={2.6} />
      </span>
      <p className="mt-2 font-display text-lg font-extrabold leading-none text-deep">
        {value}
        <span className="ml-1 text-[11px] font-bold text-muted-foreground">
          Mbps
        </span>
      </p>
      <p className="mt-1 text-[11px] font-semibold text-muted-foreground">
        {label}
      </p>
    </div>
  );
};

export const PlanCard = ({
  plan,
  compact = false,
}: {
  plan: Plan;
  compact?: boolean;
}) => (
  <Card className="space-y-4">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Seu plano
        </p>
        <p className="mt-0.5 font-display text-lg font-extrabold leading-tight text-deep">
          {plan.name}
        </p>
      </div>
      <StatusBadge tone="success" label={`Plano ${plan.status.toLowerCase()}`} />
    </div>

    <div className="flex items-end gap-1">
      <p className="font-display text-2xl font-extrabold text-deep">
        {formatCurrency(plan.price)}
      </p>
      <p className="pb-0.5 text-xs font-semibold text-muted-foreground">/mês</p>
    </div>

    {compact ? null : (
      <div className="grid grid-cols-2 gap-2.5">
        <SpeedTile
          direction="down"
          value={plan.downloadMbps}
          label="Download"
        />
        <SpeedTile direction="up" value={plan.uploadMbps} label="Upload" />
      </div>
    )}
  </Card>
);
