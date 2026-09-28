import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  mockCustomer,
  mockTickets,
  nextTicketProtocolNumber,
  type Customer,
  type Ticket,
} from "@/data";

interface CreateTicketInput {
  subject: string;
  description: string;
}

interface SessionContextValue {
  isLoggedIn: boolean;
  customer: Customer;
  tickets: Ticket[];
  /** Demonstração: apenas alterna o estado da sessão em memória. */
  login: () => void;
  logout: () => void;
  createTicket: (input: CreateTicketInput) => Ticket;
}

const SessionContext = createContext<SessionContextValue | null>(null);

const formatNow = (): string => {
  const now = new Date();
  const date = now.toLocaleDateString("pt-BR");
  const time = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${date} às ${time}`;
};

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const ticketsRef = useRef(tickets);

  useEffect(() => {
    ticketsRef.current = tickets;
  }, [tickets]);

  const login = useCallback(() => setIsLoggedIn(true), []);
  const logout = useCallback(() => setIsLoggedIn(false), []);

  const createTicket = useCallback(({ subject, description }: CreateTicketInput) => {
    const sequence = nextTicketProtocolNumber(ticketsRef.current);
    const id = `VEX-${sequence}`;
    const openedAt = formatNow();
    const ticket: Ticket = {
      id,
      protocol: `#${id}`,
      subject,
      description,
      status: "in_progress",
      openedAt,
      updates: [
        { label: "Chamado registrado", date: openedAt, done: true },
        { label: "Aguardando análise da equipe técnica", date: "Em breve", done: false },
      ],
    };

    ticketsRef.current = [ticket, ...ticketsRef.current];
    setTickets(ticketsRef.current);
    return ticket;
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({
      isLoggedIn,
      customer: mockCustomer,
      tickets,
      login,
      logout,
      createTicket,
    }),
    [isLoggedIn, tickets, login, logout, createTicket],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = (): SessionContextValue => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession precisa estar dentro de SessionProvider.");
  }
  return context;
};
