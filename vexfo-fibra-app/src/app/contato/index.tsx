import { useNavigate } from "react-router-dom";
import {
  Mail,
  MessageCircle,
  Phone,
  Store,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/vexfo/Button";
import { PageHeader } from "@/components/vexfo/Header";
import { InfoRow, NavRow } from "@/components/vexfo/InfoRow";
import { Screen } from "@/components/vexfo/Screen";
import { Section } from "@/components/vexfo/Section";
import { mockContactChannels } from "@/data";

const CHANNEL_ICONS: Record<string, LucideIcon> = {
  phone: Phone,
  message: MessageCircle,
  mail: Mail,
  store: Store,
};

/** Canais de atendimento da Vexfo (somente exibição nesta etapa). */
export const FalarComVexfo = () => {
  const navigate = useNavigate();

  return (
    <Screen
      bottomSafe
      header={<PageHeader title="Falar com a Vexfo" fallbackTo="/inicio" />}
      contentClassName="space-y-5 px-5 pb-6 pt-4"
    >
      <NavRow
        icon={MessageCircle}
        title="Abrir um chamado"
        description="Informe o problema e acompanhe pelo app"
        onClick={() => navigate("/chamados/novo")}
      />

      <Section title="Canais de atendimento">
        <div className="space-y-2.5">
          {mockContactChannels.map((channel) => (
            <div
              key={channel.id}
              className="rounded-app border border-border/60 bg-card p-3.5 shadow-card"
            >
              <InfoRow
                icon={CHANNEL_ICONS[channel.icon] ?? Phone}
                label={channel.title}
                value={channel.value}
              />
              <p className="mt-2 pl-14 text-[11px] text-muted-foreground">
                {channel.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Button
        variant="brand"
        size="xl"
        onClick={() => navigate("/chamados/novo")}
      >
        Abrir chamado pelo app
      </Button>

      <div className="rounded-app border border-dashed border-border bg-card/70 p-3.5">
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Os canais acima são apenas informativos nesta etapa. Nenhuma ligação,
          mensagem ou integração externa é disparada pelo aplicativo.
        </p>
      </div>
    </Screen>
  );
};
