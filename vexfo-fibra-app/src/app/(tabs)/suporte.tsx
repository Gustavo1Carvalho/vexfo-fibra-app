import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Gauge,
  Headphones,
  Inbox,
  Phone,
  PhoneCall,
  Router,
  Wifi,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/vexfo/Button";
import { Card } from "@/components/vexfo/Card";
import { TabHeader } from "@/components/vexfo/Header";
import { NavRow } from "@/components/vexfo/InfoRow";
import { Screen } from "@/components/vexfo/Screen";
import { Section } from "@/components/vexfo/Section";
import { useSession } from "@/context/session";
import { mockSupportTopics } from "@/data";

const TOPIC_ICONS: Record<string, LucideIcon> = {
  "wifi-off": WifiOff,
  gauge: Gauge,
  wifi: Wifi,
  router: Router,
  "credit-card": CreditCard,
  phone: Phone,
};

/** Central de ajuda com os assuntos mais comuns. */
export const Suporte = () => {
  const navigate = useNavigate();
  const { tickets } = useSession();

  const openTickets = tickets.filter((ticket) => ticket.status !== "resolved");

  return (
    <Screen
      header={<TabHeader title="Suporte" subtitle="Atendimento 24 horas" />}
      contentClassName="space-y-5 px-5 pb-6 pt-4"
    >
      <Section title="Como podemos ajudar?">
        <div className="space-y-2.5">
          {mockSupportTopics.map((topic) => {
            const Icon = TOPIC_ICONS[topic.icon] ?? Headphones;
            return (
              <NavRow
                key={topic.id}
                icon={Icon}
                title={topic.title}
                description={topic.description}
                onClick={() =>
                  navigate(
                    `/chamados/novo?assunto=${encodeURIComponent(topic.subject)}`,
                  )
                }
                className="animate-fade-up"
              />
            );
          })}
        </div>
      </Section>

      <Section title="Seus atendimentos">
        <NavRow
          icon={Inbox}
          title="Meus chamados"
          description={
            openTickets.length > 0
              ? `${openTickets.length} em andamento`
              : "Nenhum atendimento em aberto"
          }
          to="/chamados"
        />
      </Section>

      <Card className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <PhoneCall className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-deep">
              Prefere falar com a gente?
            </p>
            <p className="text-[11px] text-muted-foreground">
              Telefone, WhatsApp, e-mail e loja física
            </p>
          </div>
        </div>
        <Button variant="soft" size="default" onClick={() => navigate("/contato")}>
          Ver canais de atendimento
        </Button>
      </Card>
    </Screen>
  );
};
