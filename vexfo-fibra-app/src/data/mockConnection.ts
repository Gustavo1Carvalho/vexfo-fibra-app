import type { ConnectionInfo } from "./types";

export const mockConnection: ConnectionInfo = {
  state: "online",
  headline: "Internet funcionando normalmente",
  detail: "Conexão estável",
  signalLabel: "OK",
  signalOk: true,
  equipment: "Vexfo ONT X1",
  uptime: "12 dias e 4 horas",
  ip: "189.45.xx.xx",
  wifiName: "VEXFO-FIBRA-5G",
  lastIncident: "Nenhuma instabilidade registrada nos últimos 30 dias",
};
