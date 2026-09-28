import { Activity, Signal, Wifi, type LucideIcon } from "lucide-react";
import { Card } from "@/components/vexfo/Card";
import type { ConnectionInfo } from "@/data";

const InfoTile = ({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) => (
  <div className="rounded-2xl bg-deep-foreground/10 px-3 py-2.5 backdrop-blur-sm">
    <div className="flex items-center gap-1.5">
      <Icon className="h-3.5 w-3.5 text-deep-foreground/70" />
      <p className="text-[10px] font-bold uppercase tracking-wider text-deep-foreground/70">
        {label}
      </p>
    </div>
    <p className="mt-0.5 font-display text-sm font-extrabold">
      {value}
    </p>
  </div>
);

/**
 * Card de destaque com o status da internet.
 * O indicador verde pulsa continuamente (microinteração principal do app).
 */
export const ConnectionCard = ({
  connection,
}: {
  connection: ConnectionInfo;
}) => (
  <Card className="relative overflow-hidden border-0 bg-gradient-hero p-5 text-deep-foreground shadow-elevated">
    <div
      aria-hidden
      className="pointer-events-none absolute -right-12 -top-14 h-44 w-44 rounded-full bg-accent/25 blur-2xl"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-primary/50 blur-2xl"
    />

    <div className="relative flex items-start gap-3">
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-deep-foreground/15">
        <span
          aria-hidden
          className="absolute h-3.5 w-3.5 rounded-full bg-success animate-pulse-ring"
        />
        <span className="h-3.5 w-3.5 rounded-full bg-success ring-4 ring-success/25" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-[15px] font-extrabold leading-snug">
          {connection.headline}
        </p>
        <p className="mt-0.5 text-xs text-deep-foreground/75">
          {connection.detail}
        </p>
      </div>
      <Wifi className="h-5 w-5 shrink-0 text-deep-foreground/60" />
    </div>

    <div className="relative mt-4 grid grid-cols-2 gap-2">
      <InfoTile icon={Activity} label="Status" value="Online" />
      <InfoTile
        icon={Signal}
        label="Sinal óptico"
        value={connection.signalOk ? connection.signalLabel : "Verificando"}
      />
    </div>
  </Card>
);
