import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, Copy, FileText } from "lucide-react";
import { Button } from "@/components/vexfo/Button";
import { Card } from "@/components/vexfo/Card";
import { ErrorState } from "@/components/vexfo/ErrorState";
import { PageHeader } from "@/components/vexfo/Header";
import { Screen } from "@/components/vexfo/Screen";
import { Section } from "@/components/vexfo/Section";
import { StatusBadge } from "@/components/vexfo/StatusBadge";
import { useCopyPix } from "@/hooks/use-copy-pix";
import { formatCurrency } from "@/lib/format";
import { getInvoiceById } from "@/data";

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-4 py-1.5">
    <span className="text-xs font-semibold text-muted-foreground">{label}</span>
    <span className="text-right text-sm font-bold text-deep">{value}</span>
  </div>
);

/** Detalhes de uma fatura, com a área de PIX Copia e Cola. */
export const FaturaDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const copyPix = useCopyPix();

  const invoice = id ? getInvoiceById(id) : undefined;

  if (!invoice) {
    return (
      <Screen
        bottomSafe
        header={<PageHeader title="Detalhes da fatura" fallbackTo="/faturas" />}
        contentClassName="px-5 pb-6 pt-4"
      >
        <ErrorState
          title="Fatura não encontrada"
          description="Não localizamos esta fatura. Volte para a lista e escolha outra."
          action={
            <Button
              variant="soft"
              size="sm"
              onClick={() => navigate("/faturas")}
            >
              Ver minhas faturas
            </Button>
          }
        />
      </Screen>
    );
  }

  const isPaid = invoice.status === "paid";

  return (
    <Screen
      bottomSafe
      header={
        <PageHeader
          title="Detalhes da fatura"
          subtitle={invoice.reference}
          fallbackTo="/faturas"
        />
      }
      contentClassName="space-y-5 px-5 pb-6 pt-4"
    >
      <Card className="space-y-1">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="font-display text-base font-extrabold text-deep">
            {invoice.reference}
          </p>
          <StatusBadge
            tone={isPaid ? "success" : "warning"}
            label={isPaid ? "Pago" : "Em aberto"}
          />
        </div>
        <DetailRow label="Fatura" value={invoice.reference} />
        <DetailRow label="Valor" value={formatCurrency(invoice.amount)} />
        <DetailRow label="Vencimento" value={invoice.dueDate} />
        <DetailRow label="Status" value={isPaid ? "Pago" : "Em aberto"} />
        {isPaid && invoice.paidAt ? (
          <DetailRow label="Pagamento" value={invoice.paidAt} />
        ) : null}
      </Card>

      {isPaid ? (
        <Section title="Pagamento confirmado">
          <Card className="flex items-center gap-3 border-success/30 bg-success/5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-success/15 text-success-foreground">
              <CheckCircle2 className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-deep">
                Esta fatura já foi paga
              </p>
              <p className="text-[11px] text-muted-foreground">
                Obrigado por manter sua conta em dia.
              </p>
            </div>
          </Card>
        </Section>
      ) : null}

      <Section title="PIX Copia e Cola">
        <Card className="space-y-3">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Copie o código abaixo e cole no aplicativo do seu banco para pagar
            esta fatura.
          </p>
          <div className="max-h-28 overflow-y-auto rounded-2xl bg-muted p-3.5">
            <p className="break-all font-mono text-[11px] leading-relaxed text-deep">
              {invoice.pixCode}
            </p>
          </div>
          <Button
            variant="brand"
            size="xl"
            onClick={() => copyPix(invoice.pixCode)}
          >
            <Copy />
            Copiar PIX
          </Button>
        </Card>
      </Section>

      <Section title="Linha digitável">
        <Card className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileText className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-muted-foreground">
              Boleto (demonstração)
            </p>
            <p className="truncate font-mono text-[11px] font-bold text-deep">
              {invoice.barcode}
            </p>
          </div>
        </Card>
      </Section>
    </Screen>
  );
};
