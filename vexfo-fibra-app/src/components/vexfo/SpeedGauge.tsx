import { brand } from "@/constants/colors";

const SIZE = 240;
const STROKE = 14;
const RADIUS = (SIZE - STROKE) / 2 - 6;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface SpeedGaugeProps {
  /** Progresso do arco: 0 a 1. */
  progress: number;
  /** Valor exibido no centro, já formatado. */
  value: string;
  unit: string;
  label: string;
  active: boolean;
}

/** Velocímetro circular do teste de velocidade (apenas visual). */
export const SpeedGauge = ({
  progress,
  value,
  unit,
  label,
  active,
}: SpeedGaugeProps) => {
  const clamped = Math.min(Math.max(progress, 0), 1);

  return (
    <div
      className="relative mx-auto"
      style={{ width: SIZE, height: SIZE }}
      role="img"
      aria-label={`${label}: ${value} ${unit}`}
    >
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full -rotate-90">
        <defs>
          <linearGradient id="vexfo-gauge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={brand.blue} />
            <stop offset="55%" stopColor={brand.cyan} />
            <stop offset="100%" stopColor={brand.green} />
          </linearGradient>
        </defs>
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={STROKE}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="url(#vexfo-gauge)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - clamped)}
          style={{ transition: "stroke-dashoffset 120ms linear" }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p
          className={
            active
              ? "text-[11px] font-bold uppercase tracking-[0.18em] text-primary"
              : "text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground"
          }
        >
          {label}
        </p>
        <p className="font-display text-[46px] font-extrabold leading-none text-deep">
          {value}
        </p>
        <p className="mt-1 text-xs font-semibold text-muted-foreground">
          {unit}
        </p>
      </div>
    </div>
  );
};
