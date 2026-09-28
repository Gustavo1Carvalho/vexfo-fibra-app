import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { EmptyState } from "@/components/vexfo/EmptyState";
import { TabHeader } from "@/components/vexfo/Header";
import {
  InvoiceHighlightCard,
  InvoiceHistoryCard,
} from "@/components/vexfo/InvoiceCard";
import { Screen } from "@/components/vexfo/Screen";
import { Section } from "@/components/vexfo/Section";
import { SkeletonCard } from "@/components/vexfo/Skeleton";
import { useCopyPix } from "@/hooks/use-copy-pix";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { MOCK_CONFIG, invoiceHistory, openInvoice } from "@/data";

/** Lista de faturas em aberto e histórico. */
export const Faturas = () => {
  const navigate = useNavigate();
  const copyPix = useCopyPix();
  const loading = useSimulatedLoading(MOCK_CONFIG.initialLoadingMs);

  return (
    <Screen
      header={<TabHeader title="Minhas Faturas" subtitle="Faturas e pagamentos" />}
      contentClassName="space-y-5 px-5 pb-6 pt-4"
    >
      {loading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : (
        <>
          <Section title="Faturas em aberto">
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
                description="Tudo em dia por aqui. As próximas faturas aparecem nesta seção."
              />
            )}
          </Section>

          <Section title="Histórico">
            {invoiceHistory.length > 0 ? (
              <div className="space-y-2.5">
                {invoiceHistory.map((invoice) => (
                  <InvoiceHistoryCard
                    key={invoice.id}
                    invoice={invoice}
                    onViewDetails={() => navigate(`/faturas/${invoice.id}`)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="Nenhuma fatura no histórico."
                description="Quando uma fatura for paga, ela aparece aqui."
              />
            )}
          </Section>
        </>
      )}
    </Screen>
  );
};
