import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { PhoneFrame } from "@/components/vexfo/PhoneFrame";

/** Casca do aplicativo: moldura do celular + área útil. */
export const AppShell = ({ children }: { children: ReactNode }) => (
  <PhoneFrame>
    <div className="h-full w-full">{children}</div>
  </PhoneFrame>
);

/** Reproduz a animação de entrada a cada troca de rota. */
export const RouteFade = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="h-full animate-fade-in">
      {children}
    </div>
  );
};
