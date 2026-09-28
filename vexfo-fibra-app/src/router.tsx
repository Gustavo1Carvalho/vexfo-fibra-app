import type { ReactElement } from "react";
import { AppShell, RouteFade } from "./app/_layout";
import { TabsShell } from "./app/(tabs)/_layout";
import { Splash } from "./app/(auth)/splash";
import { Login } from "./app/(auth)/login";
import { ForgotPassword } from "./app/(auth)/esqueci-senha";
import { Dashboard } from "./app/(tabs)/index";
import { Faturas } from "./app/(tabs)/faturas";
import { Suporte } from "./app/(tabs)/suporte";
import { Perfil } from "./app/(tabs)/perfil";
import { FaturaDetalhe } from "./app/faturas/[id]";
import { MeuPlano } from "./app/plano/index";
import { TesteDeVelocidade } from "./app/velocidade/index";
import { MinhaConexao } from "./app/conexao/index";
import { FalarComVexfo } from "./app/contato/index";
import { MeusChamados } from "./app/chamados/index";
import { NovoChamado } from "./app/chamados/novo";
import { ChamadoDetalhe } from "./app/chamados/[id]";
import { DadosPessoais } from "./app/perfil/dados";
import { EnderecoInstalacao } from "./app/perfil/endereco";
import { NaoEncontrado } from "./app/not-found";

/** Telas internas, sem abas inferiores. */
const stack = (element: ReactElement) => (
  <AppShell>
    <RouteFade>{element}</RouteFade>
  </AppShell>
);

/** Telas principais, com as abas inferiores fixas. */
const tab = (element: ReactElement) => (
  <AppShell>
    <TabsShell>{element}</TabsShell>
  </AppShell>
);

export const routers = [
  { path: "/", name: "splash", element: stack(<Splash />) },
  { path: "/login", name: "login", element: stack(<Login />) },
  {
    path: "/esqueci-senha",
    name: "forgot-password",
    element: stack(<ForgotPassword />),
  },
  { path: "/inicio", name: "home", element: tab(<Dashboard />) },
  { path: "/faturas", name: "invoices", element: tab(<Faturas />) },
  { path: "/suporte", name: "support", element: tab(<Suporte />) },
  { path: "/perfil", name: "profile", element: tab(<Perfil />) },
  { path: "/faturas/:id", name: "invoice-detail", element: stack(<FaturaDetalhe />) },
  { path: "/plano", name: "plan", element: stack(<MeuPlano />) },
  {
    path: "/velocidade",
    name: "speed-test",
    element: stack(<TesteDeVelocidade />),
  },
  { path: "/conexao", name: "connection", element: stack(<MinhaConexao />) },
  { path: "/contato", name: "contact", element: stack(<FalarComVexfo />) },
  { path: "/chamados", name: "tickets", element: stack(<MeusChamados />) },
  { path: "/chamados/novo", name: "ticket-new", element: stack(<NovoChamado />) },
  {
    path: "/chamados/:id",
    name: "ticket-detail",
    element: stack(<ChamadoDetalhe />),
  },
  { path: "/perfil/dados", name: "profile-data", element: stack(<DadosPessoais />) },
  {
    path: "/perfil/endereco",
    name: "profile-address",
    element: stack(<EnderecoInstalacao />),
  },
  /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
  { path: "*", name: "404", element: stack(<NaoEncontrado />) },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
