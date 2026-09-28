import { Cable, Headset, Router, Wifi, type LucideIcon } from "lucide-react";
import { Card } from "@/components/vexfo/Card";
import { PageHeader } from "@/components/vexfo/Header";
import { PlanCard } from "@/components/vexfo/PlanCard";
import { Screen } from "@/components/vexfo/Screen";
import { Section } from "@/components/vexfo/Section";
import { mockPlan } from "@/data";

const FEATURE_ICONS: Record<string, LucideIcon> = {
  cable: Cable,
  wifi: Wifi,
  headset: Headset,
  router: Router,
};

/** Tela "Meu Plano": informações do plano contratado. */
export const MeuPlano = () => (
  <Screen
    bottomSafe
    header={
      <PageHeader
        title="Meu Plano"
        subtitle={mockPlan.name}
        fallbackTo="/inicio"
      />
    }
    contentClassName="space-y-5 px-5 pb-6 pt-4"
  >
    <PlanCard plan={mockPlan} />

    <Section title="Detalhes do plano">
      <div className="space-y-2.5">
        {mockPlan.features.map((feature) => {
          const Icon = FEATURE_ICONS[feature.icon] ?? Wifi;
          return (
            <Card
              key={feature.title}
              className="flex items-center gap-3 p-3.5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-muted text-primary">
                <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-deep">
                  {feature.title}
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>

    <div className="rounded-app border border-dashed border-border bg-card/70 p-3.5">
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Dados de demonstração. As informações reais do seu plano serão exibidas
        quando o sistema da Vexfo Fibra for integrado.
      </p>
    </div>
  </Screen>
);
