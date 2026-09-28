import type { Ticket } from "./types";

export const mockTickets: Ticket[] = [
  {
    id: "VEX-1025",
    protocol: "#VEX-1025",
    subject: "Problema de conexão",
    description:
      "A internet caiu por volta das 14h e não voltou mais. A luz do roteador está acesa, mas nenhum aparelho conecta.",
    status: "in_progress",
    openedAt: "12/09/2026 às 14:32",
    updates: [
      { label: "Chamado registrado", date: "12/09/2026 às 14:32", done: true },
      { label: "Equipe técnica analisando o sinal", date: "12/09/2026 às 15:10", done: true },
      { label: "Visita técnica agendada", date: "13/09/2026 às 09:00", done: false },
    ],
  },
  {
    id: "VEX-1018",
    protocol: "#VEX-1018",
    subject: "Internet lenta",
    description:
      "A velocidade caiu bastante no período da noite, principalmente em streaming.",
    status: "resolved",
    openedAt: "28/08/2026 às 20:15",
    updates: [
      { label: "Chamado registrado", date: "28/08/2026 às 20:15", done: true },
      { label: "Ajuste realizado no sinal óptico", date: "29/08/2026 às 11:40", done: true },
      { label: "Resolvido e validado com o cliente", date: "29/08/2026 às 16:05", done: true },
    ],
  },
];

/** Próximo protocolo da sequência de demonstração. */
export const nextTicketProtocolNumber = (tickets: Ticket[]): number => {
  const highest = tickets.reduce((max, ticket) => {
    const parsed = Number.parseInt(ticket.id.replace(/\D/g, ""), 10);
    return Number.isNaN(parsed) ? max : Math.max(max, parsed);
  }, 1000);
  return highest + 1;
};
