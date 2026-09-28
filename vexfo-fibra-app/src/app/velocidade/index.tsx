import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Gauge,
  Timer,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/vexfo/Button";
import { Card } from "@/components/vexfo/Card";
import { PageHeader } from "@/components/vexfo/Header";
import { Screen } from "@/components/vexfo/Screen";
import { Section } from "@/components/vexfo/Section";
import { SpeedGauge } from "@/components/vexfo/SpeedGauge";
import { formatNumber } from "@/lib/format";
import { mockPlan, mockSpeedTestResult } from "@/data";

interface Phase {
  label: string;
  unit: string;
  target: number;
  duration: number;
}

const PHASES: Phase[] = [
  {
    label: "PING",
    unit: "ms",
    target: mockSpeedTestResult.ping,
    duration: 1400,
  },
  {
    label: "DOWNLOAD",
    unit: "Mbps",
    target: mockSpeedTestResult.download,
    duration: 2500,
  },
  {
    label: "UPLOAD",
    unit: "Mbps",
    target: mockSpeedTestResult.upload,
    duration: 2500,
  },
];

const TOTAL_DURATION = PHASES.reduce((sum, phase) => sum + phase.duration, 0);

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

type TestStatus = "idle" | "running" | "done";

const ResultTile = ({
  icon: Icon,
  label,
  value,
  unit,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  unit: string;
}) => (
  <div className="animate-fade-up rounded-app border border-border/60 bg-card px-3 py-3.5 text-center shadow-card">
    <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-primary">
      <Icon className="h-[18px] w-[18px]" strokeWidth={2.4} />
    </span>
    <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
      {label}
    </p>
    <p className="font-display text-lg font-extrabold leading-tight text-deep">
      {value}
    </p>
    <p className="text-[10px] font-semibold text-muted-foreground">{unit}</p>
  </div>
);

/**
 * Teste de velocidade apenas visual: a animação simula a medição e o resultado
 * é fixo (src/data/mockSpeedTest.ts). Nenhum teste real é executado nesta fase.
 */
export const TesteDeVelocidade = () => {
  const [status, setStatus] = useState<TestStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [liveValue, setLiveValue] = useState(mockPlan.downloadMbps);
  const [liveUnit, setLiveUnit] = useState("Mbps");
  const [liveLabel, setLiveLabel] = useState("SEU PLANO");
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const startTest = () => {
    if (status === "running") return;

    const startedAt = performance.now();
    setStatus("running");
    setProgress(0);

    const tick = (now: number) => {
      const elapsed = now - startedAt;

      let cursor = 0;
      let active = PHASES[0];
      let localProgress = 1;

      for (const phase of PHASES) {
        if (elapsed < cursor + phase.duration) {
          active = phase;
          localProgress = (elapsed - cursor) / phase.duration;
          break;
        }
        cursor += phase.duration;
      }

      if (elapsed >= TOTAL_DURATION) {
        setProgress(1);
        setLiveLabel("DOWNLOAD");
        setLiveUnit("Mbps");
        setLiveValue(mockSpeedTestResult.download);
        setStatus("done");
        return;
      }

      const eased = easeOutCubic(Math.min(localProgress, 1));
      const jitter = 0.92 + 0.08 * Math.sin((elapsed / TOTAL_DURATION) * 22);

      setLiveLabel(active.label);
      setLiveUnit(active.unit);
      setLiveValue(active.target * eased * jitter);
      setProgress(elapsed / TOTAL_DURATION);

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);
  };

  const isRunning = status === "running";

  return (
    <Screen
      bottomSafe
      header={<PageHeader title="Teste de velocidade" fallbackTo="/inicio" />}
      contentClassName="space-y-5 px-5 pb-6 pt-4"
    >
      <Card className="flex flex-col items-center gap-5 py-6">
        <SpeedGauge
          progress={status === "done" ? 1 : progress}
          value={formatNumber(liveValue)}
          unit={liveUnit}
          label={liveLabel}
          active={isRunning}
        />

        <p className="h-5 text-center text-xs font-semibold text-muted-foreground">
          {isRunning
            ? `Medindo ${liveLabel.toLowerCase()}...`
            : status === "done"
              ? "Teste concluído"
              : "Verifique a velocidade que chega no seu aparelho"}
        </p>

        <Button
          size="xl"
          variant="brand"
          className="tracking-wide"
          onClick={startTest}
          disabled={isRunning}
        >
          <Zap />
          {isRunning
            ? "TESTANDO..."
            : status === "done"
              ? "TESTAR NOVAMENTE"
              : "INICIAR TESTE"}
        </Button>
      </Card>

      {status === "done" ? (
        <Section title="Resultado do teste">
          <div className="grid grid-cols-3 gap-2.5">
            <ResultTile
              icon={Timer}
              label="Ping"
              value={formatNumber(mockSpeedTestResult.ping)}
              unit="ms"
            />
            <ResultTile
              icon={ArrowDown}
              label="Download"
              value={formatNumber(mockSpeedTestResult.download)}
              unit="Mbps"
            />
            <ResultTile
              icon={ArrowUp}
              label="Upload"
              value={formatNumber(mockSpeedTestResult.upload)}
              unit="Mbps"
            />
          </div>
        </Section>
      ) : null}

      <Card className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Gauge className="h-[18px] w-[18px]" strokeWidth={2.2} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-deep">
            Resultados de demonstração
          </p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
            Nesta etapa o teste é apenas visual. A medição real da sua conexão
            será integrada na próxima fase do aplicativo.
          </p>
        </div>
      </Card>
    </Screen>
  );
};
