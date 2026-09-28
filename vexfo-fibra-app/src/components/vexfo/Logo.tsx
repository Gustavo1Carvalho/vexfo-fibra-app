import { useState } from "react";
import { brandAssets } from "@/constants/colors";
import { cn } from "@/lib/utils";

type LogoVariant = "lockup" | "symbol";

/**
 * Logo Vexfo Fibra. Os arquivos foram recortados do original enviado
 * (nenhum traço do símbolo foi redesenhado).
 * A cadeia de fallback existe apenas para que o layout nunca quebre caso
 * o derivado recortado não esteja disponível.
 */
const SOURCES: Record<LogoVariant, string[]> = {
  lockup: [brandAssets.lockup, brandAssets.original],
  symbol: [brandAssets.symbol, brandAssets.original],
};

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  alt?: string;
}

export const Logo = ({
  variant = "symbol",
  className,
  alt = "Vexfo Fibra",
}: LogoProps) => {
  const [attempt, setAttempt] = useState(0);
  const sources = SOURCES[variant];
  const source = sources[Math.min(attempt, sources.length - 1)];

  return (
    <img
      src={source}
      alt={alt}
      draggable={false}
      onError={() =>
        setAttempt((current) => Math.min(current + 1, sources.length - 1))
      }
      className={cn("select-none object-contain", className)}
    />
  );
};
