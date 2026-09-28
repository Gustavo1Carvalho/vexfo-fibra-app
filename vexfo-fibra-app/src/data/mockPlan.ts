import type { Plan } from "./types";

export const mockPlan: Plan = {
  id: "vexfo-500",
  name: "VEXFO 500 MEGAS",
  price: 109.99,
  downloadMbps: 500,
  uploadMbps: 250,
  status: "Ativo",
  features: [
    {
      icon: "cable",
      title: "Internet Fibra Óptica",
      description: "Fibra até sua casa com baixa latência",
    },
    {
      icon: "wifi",
      title: "Wi-Fi incluído",
      description: "Roteador dual band liberado no plano",
    },
    {
      icon: "headset",
      title: "Suporte técnico",
      description: "Atendimento todos os dias, 24 horas",
    },
    {
      icon: "router",
      title: "Equipamento Vexfo",
      description: "Roteador em regime de comodato",
    },
  ],
};
