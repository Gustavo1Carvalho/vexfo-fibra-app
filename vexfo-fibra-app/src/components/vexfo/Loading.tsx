import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  label?: string;
  className?: string;
}

/** Indicador compacto, usado dentro de botões e blocos. */
export const Loading = ({ label, className }: LoadingProps) => (
  <span
    role="status"
    className={cn(
      "inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground",
      className,
    )}
  >
    <Loader2 className="h-4 w-4 animate-spin" />
    {label ? <span>{label}</span> : null}
  </span>
);

/** Carregamento que ocupa a área toda da tela. */
export const FullScreenLoader = ({
  label = "Carregando...",
  className,
}: LoadingProps) => (
  <div
    className={cn(
      "flex h-full min-h-[16rem] flex-col items-center justify-center gap-3 bg-muted",
      className,
    )}
  >
    <span className="relative flex h-14 w-14 items-center justify-center">
      <span
        aria-hidden
        className="absolute h-14 w-14 rounded-full border-2 border-primary/20 border-t-primary animate-spin"
      />
      <Loader2 className="h-5 w-5 text-primary" />
    </span>
    <p className="text-xs font-semibold text-muted-foreground">{label}</p>
  </div>
);
