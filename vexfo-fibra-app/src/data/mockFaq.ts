import type { SupportTopic } from "./types";

/** As chaves de `icon` são resolvidas para ícones lucide em `src/app/(tabs)/suporte.tsx`. */
export const mockSupportTopics: SupportTopic[] = [
  {
    id: "sem-internet",
    icon: "wifi-off",
    title: "Estou sem internet",
    description: "Nenhum aparelho conecta",
    subject: "Estou sem internet",
  },
  {
    id: "internet-lenta",
    icon: "gauge",
    title: "Internet lenta",
    description: "Velocidade abaixo do plano",
    subject: "Internet lenta",
  },
  {
    id: "wifi",
    icon: "wifi",
    title: "Problema no Wi-Fi",
    description: "Sinal fraco ou caindo",
    subject: "Problema no Wi-Fi",
  },
  {
    id: "roteador",
    icon: "router",
    title: "Problema no roteador",
    description: "Luzes apagadas ou piscando",
    subject: "Problema no roteador",
  },
  {
    id: "pagamento",
    icon: "credit-card",
    title: "Problema com pagamento",
    description: "Fatura, PIX ou boleto",
    subject: "Problema com pagamento",
  },
  {
    id: "outro",
    icon: "phone",
    title: "Outro problema",
    description: "Fale com a nossa equipe",
    subject: "Outro problema",
  },
];

/** Canais de contato (apenas exibição — nenhuma integração real nesta etapa). */
export const mockContactChannels = [
  {
    id: "telefone",
    icon: "phone",
    title: "Central de atendimento",
    value: "0800 000 0000",
    description: "Todos os dias, 24 horas",
  },
  {
    id: "whatsapp",
    icon: "message",
    title: "WhatsApp Vexfo",
    value: "(98) 9 9999-9999",
    description: "Atendimento de segunda a sábado, 8h às 20h",
  },
  {
    id: "email",
    icon: "mail",
    title: "E-mail",
    value: "atendimento@vexfofibra.com.br",
    description: "Resposta em até 24 horas úteis",
  },
  {
    id: "loja",
    icon: "store",
    title: "Loja física",
    value: "Av. dos Holandeses, 1200 - São Luís/MA",
    description: "Segunda a sexta, 8h às 18h",
  },
];
