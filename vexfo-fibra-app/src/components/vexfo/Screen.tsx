import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScreenProps {
  /** Cabeçalho fixo (não rola com o conteúdo). */
  header?: ReactNode;
  /** Rodapé fixo, usado quando a tela tem ação fixa na base. */
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  /** Reserva a área segura inferior (telas fora das abas). */
  bottomSafe?: boolean;
  scroll?: boolean;
}

/**
 * Estrutura base de todas as telas: cabeçalho fixo, conteúdo rolável e rodapé.
 * A rolagem acontece dentro da moldura, nunca na página.
 */
export const Screen = ({
  header,
  footer,
  children,
  className,
  contentClassName,
  bottomSafe = false,
  scroll = true,
}: ScreenProps) => (
  <div className={cn("flex h-full min-h-0 flex-col bg-muted", className)}>
    {header}
    <main
      className={cn(
        "min-h-0 flex-1",
        scroll ? "app-scroll" : "flex flex-col overflow-hidden",
        contentClassName,
      )}
    >
      {children}
      {bottomSafe ? <div aria-hidden className="pb-safe" /> : null}
    </main>
    {footer}
  </div>
);
