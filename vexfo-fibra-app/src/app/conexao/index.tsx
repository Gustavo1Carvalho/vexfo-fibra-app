import {
  Activity,
  Router,
  ShieldCheck,
  Signal,
  Timer,
  Wifi,
} from "lucide-react";
import { Card } from "@/components/vexfo/Card";
import { ConnectionCard } from "@/components/vexfo/ConnectionCard";
import { PageHeader } from "@/components/vexfo/Header";
import { InfoRow } from "@/components/vexfo/InfoRow";
import { Screen } from "@/components/vexfo/Screen";
import { Section } from "@/components/vexfo/Section";
import { ServicesCheck } from "@/components/vexfo/ServicesCheck";
import { mockConnection } from "@/data";

/** Tela "Minha conexão": status atual e dados técnicos (mock). */
export const MinhaConexao = () => (
  <Screen
    bottomSafe
    header={<PageHeader title="Minha conexão" fallbackTo="/inicio" />}
    contentClassName="space-y-5 px-5 pb-6 pt-4"
  >
    <ConnectionCard connection={mockConnection} />

    <Section title="Verificação dos serviços">
      <ServicesCheck
        items={[
          { label: "Sinal óptico", ok: true },
          { label: "Autenticação", ok: true },
          { label: "Roteamento", ok: true },
        ]}
      />
    </Section>

    <Section title="Equipamento">
      <div className="space-y-2.5">
        <Card className="p-3.5">
          <InfoRow
            icon={Router}
            label="Roteador"
            value={mockConnection.equipment}
          />
        </Card>
        <Card className="p-3.5">
          <InfoRow icon={Wifi} label="Rede Wi-Fi" value={mockConnection.wifiName} />
        </Card>
      </div>
    </Section>

    <Section title="Detalhes técnicos">
      <Card className="space-y-4">
        <InfoRow icon={Timer} label="Tempo conectado" value={mockConnection.uptime} />
        <div className="h-px bg-border" />
        <InfoRow icon={Signal} label="IP de conexão" value={mockConnection.ip} />
        <div className="h-px bg-border" />
        <InfoRow
          icon={Activity}
          label="Últimos 30 dias"
          value={mockConnection.lastIncident}
        />
        <div className="h-px bg-border" />
        <InfoRow
          icon={ShieldCheck}
          label="Sinal óptico"
          value={mockConnection.signalLabel}
        />
      </Card>
    </Section>

    <div className="rounded-app border border-dashed border-border bg-card/70 p-3.5">
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Informações de demonstração. Os dados reais do seu equipamento serão
        exibidos quando o monitoramento da Vexfo Fibra for integrado.
      </p>
    </div>
  </Screen>
);
