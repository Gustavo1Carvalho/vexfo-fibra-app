export type InvoiceStatus = "open" | "paid" | "overdue";

export interface Invoice {
  id: string;
  reference: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
  paidAt?: string;
  pixCode: string;
  barcode: string;
}

export type TicketStatus = "open" | "in_progress" | "resolved";

export interface TicketUpdate {
  label: string;
  date: string;
  done: boolean;
}

export interface Ticket {
  id: string;
  protocol: string;
  subject: string;
  description: string;
  status: TicketStatus;
  openedAt: string;
  updates: TicketUpdate[];
}

export interface Address {
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  zip: string;
}

export interface Customer {
  name: string;
  firstName: string;
  cpf: string;
  phone: string;
  email: string;
  customerSince: string;
  address: Address;
}

export interface PlanFeature {
  icon: string;
  title: string;
  description: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  downloadMbps: number;
  uploadMbps: number;
  status: string;
  features: PlanFeature[];
}

export type ConnectionState = "online" | "degraded" | "offline";

export interface ConnectionInfo {
  state: ConnectionState;
  headline: string;
  detail: string;
  signalLabel: string;
  signalOk: boolean;
  equipment: string;
  uptime: string;
  ip: string;
  wifiName: string;
  lastIncident: string;
}

export interface SpeedTestResult {
  ping: number;
  download: number;
  upload: number;
}

export interface SupportTopic {
  id: string;
  icon: string;
  title: string;
  description: string;
  subject: string;
}
