import type { ReactNode } from "react";
import { OVERLAY_ID } from "@/hooks/use-overlay-container";
import { cn } from "@/lib/utils";

/**
 * Moldura de smartphone usada no desktop para deixar claro que o produto é um
 * aplicativo mobile. Abaixo de 640px a moldura desaparece e o app ocupa a tela
 * inteira, respeitando as áreas seguras do aparelho.
 */
export const PhoneFrame = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "backdrop-app relative flex h-dvh w-full items-center justify-center overflow-hidden sm:p-6",
      className,
    )}
  >
    <div
      aria-hidden
      className="pointer-events-none absolute -left-24 top-6 hidden h-72 w-72 rounded-full bg-accent/20 blur-3xl sm:block"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -right-16 bottom-0 hidden h-80 w-80 rounded-full bg-primary/25 blur-3xl sm:block"
    />

    <div className="relative z-10 flex h-dvh w-full flex-col overflow-hidden bg-background sm:h-[860px] sm:max-h-[92dvh] sm:w-[420px] sm:rounded-[2.9rem] sm:border-[10px] sm:border-deep sm:shadow-elevated">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-2.5 z-50 hidden h-6 w-28 -translate-x-1/2 rounded-full bg-deep sm:block"
      />
      <div className="relative min-h-0 flex-1 sm:pt-9">{children}</div>
      <div
        id={OVERLAY_ID}
        className="pointer-events-none absolute inset-0 z-40 overflow-hidden"
      />
    </div>
  </div>
);
