import { useNavigate, useParams } from "react-router-dom";
import { Check, CircleDashed, Timer } from "lucide-react";
import { Button } from "@/components/vexfo/Button";
import { Card } from "@/components/vexfo/Card";
import { ErrorState } from "@/components/vexfo/ErrorState";
import { PageHeader } from "@/components/vexfo/Header";
import { Screen } from "@/components/vexfo/Screen";
import { Section } from "@/components/vexfo/Section";
import { StatusBadge, type StatusTone } from "@/components/vexfo/StatusBadge";
import { useSession } from "@/context/session";
import { cn } from "@/lib/utils";
import type { TicketStatus } from "@/data";

const STATUS_CONFIG: Record<TicketStatus, { label: string; tone: StatusTone }> = {
  open: { label: "Aberto", tone: "warning" },
  in_progress: { label: "Em atendimento", tone: "primary" },
  resolved: { label: "Resolvido", tone: "success" },
};

/** Detalhes e histórico de um chamado. */
export const ChamadoDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tickets } = useSession();

  const ticket = tickets.find((item) => item.id === id);

  if (!ticket) {
    return (
      <Screen
        bottomSafe
        header={<PageHeader title="Chamado" fallbackTo="/chamados" />}
        contentClassName="px-5 pb-6 pt-4"
      >
        <ErrorState
          title="Chamado não encontrado"
          description="Não localizamos este atendimento. Volte para a lista de chamados."
          action={
            <Button
              variant="soft"
              size="sm"
              onClick={() => navigate("/chamados")}
            >
              Ver meus chamados
            </Button>
          }
        />
      </Screen>
    );
  }

  const config = STATUS_CONFIG[ticket.status];

  return (
    <Screen
      bottomSafe
      header={
        <PageHeader
          title="Detalhes do chamado"
          subtitle={ticket.protocol}
          fallbackTo="/chamados"
        />
      }
      contentClassName="space-y-5 px-5 pb-6 pt-4"
    >
      <Card className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[11px] font-bold tracking-wide text-muted-foreground">
            {ticket.protocol}
          </p>
          <StatusBadge tone={config.tone} label={config.label} />
        </div>
        <p className="font-display text-lg font-extrabold text-deep">
          {ticket.subject}
        </p>
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Timer className="h-3.5 w-3.5" />
          Aberto em {ticket.openedAt}
        </div>
      </Card>

      <Section title="Descrição">
        <Card>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {ticket.description}
          </p>
        </Card>
      </Section>

      <Section title="Acompanhamento">
        <Card className="space-y-0">
          {ticket.updates.map((update, index) => {
            const isLast = index === ticket.updates.length - 1;
            return (
              <div key={update.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                      update.done
                        ? "bg-success/15 text-success-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {update.done ? (
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    ) : (
                      <CircleDashed className="h-3.5 w-3.5" strokeWidth={2.4} />
                    )}
                  </span>
                  {isLast ? null : (
                    <span
                      className={cn(
                        "w-px flex-1",
                        update.done ? "bg-success/30" : "bg-border",
                      )}
                    />
                  )}
                </div>
                <div className={cn("min-w-0 flex-1", !isLast && "pb-5")}>
                  <p className="text-[13px] font-bold text-deep">
                    {update.label}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {update.date}
                  </p>
                </div>
              </div>
            );
          })}
        </Card>
      </Section>

      <Button
        variant="brandOutline"
        size="xl"
        onClick={() => navigate("/contato")}
      >
        Falar com a Vexfo
      </Button>
    </Screen>
  );
};
