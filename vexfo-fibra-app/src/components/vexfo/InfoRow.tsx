import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const IconTile = ({ icon: Icon }: { icon: LucideIcon }) => (
  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-muted text-primary">
    <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
  </span>
);

/** Linha informativa, sem ação (telefone, e-mail, dados técnicos). */
export const InfoRow = ({
  icon,
  label,
  value,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
}) => (
  <div className={cn("flex items-center gap-3", className)}>
    <IconTile icon={icon} />
    <div className="min-w-0 flex-1">
      <p className="text-[11px] font-semibold text-muted-foreground">{label}</p>
      <p className="truncate text-sm font-bold text-deep">{value}</p>
    </div>
  </div>
);

interface NavRowProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  /** Quando informado, a linha navega; caso contrário executa `onClick`. */
  to?: string;
  onClick?: () => void;
  right?: ReactNode;
  className?: string;
}

/** Linha clicável com ícone, título, descrição e seta. */
export const NavRow = ({
  icon,
  title,
  description,
  to,
  onClick,
  right,
  className,
}: NavRowProps) => {
  const content = (
    <>
      <IconTile icon={icon} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-bold text-deep">
          {title}
        </span>
        {description ? (
          <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
            {description}
          </span>
        ) : null}
      </span>
      {right}
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
    </>
  );

  const classes = cn(
    "pressable flex w-full items-center gap-3 rounded-app border border-border/60 bg-card p-3.5 text-left shadow-card",
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
};
