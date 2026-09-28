import { useNavigate } from "react-router-dom";
import { Inbox, Plus, Timer } from "lucide-react";
import { Button } from "@/components/vexfo/Button";
import { PressableCard } from "@/components/vexfo/Card";
import { EmptyState } from "@/components/vexfo/EmptyState";
import { PageHeader } from "@/components/vexfo/Header";
import { Screen } from "@/components/vexfo/Screen";
import { StatusBadge, type StatusTone } from "@/components/vexfo/StatusBadge";
import { useSession } from "@/context/session";
import type { TicketStatus } from "@/data";

const STATUS_CONFIG: Record<TicketStatus, { label: string; tone: StatusTone }> = {
  open: { label: "Aberto", tone: "warning" },
  in_progress: { label: "Em atendimento", tone: "primary" },
  resolved: { label: "Resolvido", tone: "success" },
};

/** Histórico de chamados do assinante. */
export const MeusChamados = () => {
  const navigate = useNavigate();
  const { tickets } = useSession();

  return (
    <Screen
      bottomSafe
      header={
        <PageHeader
          title="Meus chamados"
          subtitle={`${tickets.length} registrado(s)`}
          fallbackTo="/suporte"
        />
      }
      contentClassName="space-y-4 px-5 pb-6 pt-4"
    >
      <Button variant="brand" size="xl" onClick={() => navigate("/chamados/novo")}>
        <Plus />
        Abrir novo chamado
      </Button>

      {tickets.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="Não encontramos nenhum chamado."
          description="Quando você abrir um atendimento, ele aparecerá aqui com o protocolo e o andamento."
          action={
            <Button
              variant="soft"
              size="sm"
              onClick={() => navigate("/chamados/novo")}
            >
              Abrir chamado
            </Button>
          }
        />
      ) : (
        <div className="space-y-2.5">
          {tickets.map((ticket, index) => {
            const config = STATUS_CONFIG[ticket.status];
            return (
              <PressableCard
                key={ticket.id}
                className="animate-fade-up space-y-2.5"
                style={{ animationDelay: `${index * 45}ms` }}
                onClick={() => navigate(`/chamados/${ticket.id}`)}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[11px] font-bold tracking-wide text-muted-foreground">
                    {ticket.protocol}
                  </p>
                  <StatusBadge tone={config.tone} label={config.label} />
                </div>
                <p className="font-display text-sm font-extrabold text-deep">
                  {ticket.subject}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Timer className="h-3.5 w-3.5" />
                  Aberto em {ticket.openedAt}
                </div>
              </PressableCard>
            );
          })}
        </div>
      )}
    </Screen>
  );
};
