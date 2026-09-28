import type { Customer } from "./types";

export const mockCustomer: Customer = {
  name: "João da Silva",
  firstName: "João",
  cpf: "12345678900",
  phone: "(98) 9 9999-9999",
  email: "joao@email.com",
  customerSince: "Março de 2023",
  address: {
    street: "Rua das Palmeiras",
    number: "128",
    complement: "Apto 302 - Bloco B",
    district: "Jardim Renascença",
    city: "São Luís",
    state: "MA",
    zip: "65075-000",
  },
};
