import { Check, ChevronRight, Copy, FileText } from "lucide-react";
import { Button } from "@/components/vexfo/Button";
import { Card, PressableCard } from "@/components/vexfo/Card";
import { StatusBadge } from "@/components/vexfo/StatusBadge";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Invoice } from "@/data";

interface InvoiceCardProps {
  invoice: Invoice;
  onViewDetails?: () => void;
  onCopyPix?: () => void;
  className?: string;
}

/** Fatura em destaque, com ações de detalhes e cópia do PIX. */
export const InvoiceHighlightCard = ({
  invoice,
  onViewDetails,
  onCopyPix,
  className,
}: InvoiceCardProps) => (
  <Card className={cn("space-y-4", className)}>
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Fatura em aberto
        </p>
        <p className="mt-0.5 font-display text-base font-extrabold text-deep">
          {invoice.reference}
        </p>
      </div>
      <StatusBadge tone="warning" label="Em aberto" />
    </div>

    <div className="rounded-2xl bg-muted px-4 py-3.5">
      <p className="text-[11px] font-semibold text-muted-foreground">Valor</p>
      <p className="font-display text-[28px] font-extrabold leading-tight text-deep">
        {formatCurrency(invoice.amount)}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Vencimento:{" "}
        <span className="font-bold text-deep">{invoice.dueDate}</span>
      </p>
    </div>

    <div className="grid grid-cols-2 gap-2">
      <Button variant="brand" size="sm" onClick={onViewDetails}>
        <FileText />
        Ver detalhes
      </Button>
      <Button variant="brandOutline" size="sm" onClick={onCopyPix}>
        <Copy />
        Copiar PIX
      </Button>
    </div>
  </Card>
);

/** Linha compacta do histórico de faturas já pagas. */
export const InvoiceHistoryCard = ({
  invoice,
  onViewDetails,
  className,
}: InvoiceCardProps) => (
  <PressableCard
    className={cn("flex items-center gap-3 p-3.5", className)}
    onClick={onViewDetails}
  >
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-success/15 text-success-foreground">
      <Check className="h-5 w-5" strokeWidth={3} />
    </span>
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-bold text-deep">
        {invoice.reference}
      </p>
      <p className="truncate text-[11px] text-muted-foreground">
        {invoice.paidAt ? `Pago em ${invoice.paidAt}` : "Pagamento confirmado"}
      </p>
    </div>
    <div className="shrink-0 text-right">
      <p className="text-sm font-bold text-deep">
        {formatCurrency(invoice.amount)}
      </p>
      <p className="text-[11px] font-semibold text-success-foreground">Pago</p>
    </div>
    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
  </PressableCard>
);
