/**
 * Ponto único de acesso aos dados de demonstração.
 * Na próxima fase, cada arquivo aqui é substituído por chamadas à API real
 * sem precisar alterar os componentes.
 */
export * from "./types";
export { MOCK_CONFIG } from "./mockConfig";
export { mockCustomer } from "./mockCustomer";
export { mockPlan } from "./mockPlan";
export {
  allInvoices,
  getInvoiceById,
  invoiceHistory,
  openInvoice,
} from "./mockInvoices";
export { mockTickets, nextTicketProtocolNumber } from "./mockTickets";
export { mockConnection } from "./mockConnection";
export { mockSpeedTestResult } from "./mockSpeedTest";
export { mockContactChannels, mockSupportTopics } from "./mockFaq";
