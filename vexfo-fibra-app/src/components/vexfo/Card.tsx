import * as React from "react";
import { cn } from "@/lib/utils";

/** Card base do app: cantos generosos, borda discreta e sombra suave. */
export const Card = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "rounded-app border border-border/60 bg-card p-4 shadow-card",
      className,
    )}
    {...props}
  />
);

/** Card clicável, com retorno visual ao toque. */
export const PressableCard = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    className={cn(
      "pressable rounded-app border border-border/60 bg-card p-4 text-left shadow-card",
      className,
    )}
    {...props}
  />
);
