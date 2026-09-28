import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessStateProps {
  title: string;
  description?: string;
  /** Bloco extra, como o protocolo de um chamado. */
  children?: ReactNode;
  action?: ReactNode;
  className?: string;
}

/** Confirmação de sucesso com animação de entrada. */
export const SuccessState = ({
  title,
  description,
  children,
  action,
  className,
}: SuccessStateProps) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center px-6 py-8 text-center",
      className,
    )}
  >
    <span className="relative flex h-20 w-20 items-center justify-center">
      <span
        aria-hidden
        className="absolute h-20 w-20 rounded-full bg-success/25 animate-pulse-ring"
      />
      <span className="animate-scale-in flex h-20 w-20 items-center justify-center rounded-full bg-gradient-success text-success-foreground shadow-success">
        <Check className="h-10 w-10" strokeWidth={3} />
      </span>
    </span>

    <p className="mt-5 font-display text-xl font-extrabold text-deep">
      {title}
    </p>
    {description ? (
      <p className="mt-2 max-w-[17rem] text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    ) : null}
    {children ? <div className="mt-5 w-full">{children}</div> : null}
    {action ? <div className="mt-6 w-full">{action}</div> : null}
  </div>
);
