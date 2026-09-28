import type { ReactNode } from "react";
import { TabBar } from "@/components/vexfo/TabBar";
import { RouteFade } from "@/app/_layout";

/**
 * Casca das telas com abas inferiores: mantém a TabBar fixa e anima
 * apenas a área de conteúdo a cada troca de aba.
 */
export const TabsShell = ({ children }: { children: ReactNode }) => (
  <div className="flex h-full min-h-0 flex-col">
    <div className="min-h-0 flex-1">
      <RouteFade>{children}</RouteFade>
    </div>
    <TabBar />
  </div>
);
