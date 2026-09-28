import type { Invoice } from "./types";

/**
 * Fatura em aberto. Mesma origem de dados usada no Dashboard, na lista de
 * faturas e na tela de detalhes — assim os valores nunca divergem entre telas.
 */
export const openInvoice: Invoice = {
  id: "2026-09",
  reference: "SETEMBRO/2026",
  amount: 109.99,
  dueDate: "10/10/2026",
  status: "open",
  pixCode:
    "00020126580014BR.GOV.BCB.PIX0136vexfo-fibra-pagamento-demonstrativo5204000053039865802BR5920VEXFO FIBRA LTDA6009SAO PAULO62070503***6304A1B2",
  barcode: "34191.79001 01043.510047 91020.150008 9 98760000010999",
};

export const invoiceHistory: Invoice[] = [
  {
    id: "2026-08",
    reference: "AGOSTO/2026",
    amount: 109.99,
    dueDate: "10/09/2026",
    status: "paid",
    paidAt: "08/09/2026",
    pixCode: "00020126580014BR.GOV.BCB.PIX0136vexfo-fibra-pagamento-demonstrativo5204000053039865802BR5920VEXFO FIBRA LTDA6009SAO PAULO62070503***6304A1B2",
    barcode: "34191.79001 01043.510047 91020.150008 9 98760000010998",
  },
  {
    id: "2026-07",
    reference: "JULHO/2026",
    amount: 109.99,
    dueDate: "10/08/2026",
    status: "paid",
    paidAt: "10/08/2026",
    pixCode: "00020126580014BR.GOV.BCB.PIX0136vexfo-fibra-pagamento-demonstrativo5204000053039865802BR5920VEXFO FIBRA LTDA6009SAO PAULO62070503***6304A1B2",
    barcode: "34191.79001 01043.510047 91020.150008 9 98760000010997",
  },
  {
    id: "2026-06",
    reference: "JUNHO/2026",
    amount: 109.99,
    dueDate: "10/07/2026",
    status: "paid",
    paidAt: "09/07/2026",
    pixCode: "00020126580014BR.GOV.BCB.PIX0136vexfo-fibra-pagamento-demonstrativo5204000053039865802BR5920VEXFO FIBRA LTDA6009SAO PAULO62070503***6304A1B2",
    barcode: "34191.79001 01043.510047 91020.150008 9 98760000010996",
  },
];

export const allInvoices: Invoice[] = [openInvoice, ...invoiceHistory];

export const getInvoiceById = (id: string): Invoice | undefined =>
  allInvoices.find((invoice) => invoice.id === id);
