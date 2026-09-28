import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  CreditCard,
  FileText,
  Headphones,
  PhoneCall,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/vexfo/Button";
import { ConnectionCard } from "@/components/vexfo/ConnectionCard";
import { EmptyState } from "@/components/vexfo/EmptyState";
import { HomeHeader } from "@/components/vexfo/Header";
import { InvoiceHighlightCard } from "@/components/vexfo/InvoiceCard";
import { PlanCard } from "@/components/vexfo/PlanCard";
import {
  QuickAction,
  type QuickActionAccent,
} from "@/components/vexfo/QuickAction";
import { Screen } from "@/components/vexfo/Screen";
import { Section } from "@/components/vexfo/Section";
import { SkeletonCard } from "@/components/vexfo/Skeleton";
import { useCopyPix } from "@/hooks/use-copy-pix";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { MOCK_CONFIG, mockConnection, mockPlan, openInvoice } from "@/data";

interface QuickActionItem {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  accent: QuickActionAccent;
}

const QUICK_ACTIONS: QuickActionItem[] = [
  {
    icon: CreditCard,
    title: "Faturas",
    description: "Ver faturas e histórico",
    to: "/faturas",
    accent: "blue",
  },
  {
    icon: Headphones,
    title: "Suporte",
    description: "Resolver um problema",
    to: "/suporte",
    accent: "cyan",
  },
  {
    icon: Zap,
    title: "Teste de velocidade",
    description: "Meça a sua conexão",
    to: "/velocidade",
    accent: "green",
  },
  {
    icon: FileText,
    title: "Meu plano",
    description: "Detalhes da sua internet",
    to: "/plano",
    accent: "navy",
  },
  {
    icon: Wifi,
    title: "Minha conexão",
    description: "Status e equipamento",
    to: "/conexao",
    accent: "blue",
  },
  {
    icon: PhoneCall,
    title: "Falar com a Vexfo",
    description: "Canais de atendimento",
    to: "/contato",
    accent: "cyan",
  },
];

/** Tela inicial do assinante. */
export const Dashboard = () => {
  const navigate = useNavigate();
  const copyPix = useCopyPix();
  const loading = useSimulatedLoading(MOCK_CONFIG.initialLoadingMs);

  return (
    <Screen
      header={<HomeHeader />}
      contentClassName="space-y-5 px-5 pb-6 pt-4"
    >
      {loading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((key) => (
              <SkeletonCard key={key} className="h-32" />
            ))}
          </div>
        </>
      ) : (
        <>
          <ConnectionCard connection={mockConnection} />

          <PlanCard plan={mockPlan} />

          {MOCK_CONFIG.showPendingInvoice ? (
            <InvoiceHighlightCard
              invoice={openInvoice}
              onViewDetails={() => navigate(`/faturas/${openInvoice.id}`)}
              onCopyPix={() => copyPix(openInvoice.pixCode)}
            />
          ) : (
            <EmptyState
              icon={CheckCircle2}
              title="Você não possui faturas em aberto."
              description="Quando uma nova fatura for gerada, ela aparece aqui automaticamente."
              action={
                <Button
                  variant="soft"
                  size="sm"
                  onClick={() => navigate("/faturas")}
                >
                  Ver histórico
                </Button>
              }
            />
          )}

          <Section title="Atalhos">
            <div className="grid grid-cols-2 gap-3">
              {QUICK_ACTIONS.map((action, index) => (
                <QuickAction
                  key={action.to}
                  icon={action.icon}
                  title={action.title}
                  description={action.description}
                  to={action.to}
                  accent={action.accent}
                  index={index}
                />
              ))}
            </div>
          </Section>
        </>
      )}
    </Screen>
  );
};
