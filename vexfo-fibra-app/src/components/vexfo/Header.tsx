import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Logo } from "@/components/vexfo/Logo";
import { useSession } from "@/context/session";
import { initialsFromName } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Casca do cabeçalho, com área segura superior e leve desfoque de fundo. */
export const AppHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <header
    className={cn(
      "z-30 shrink-0 border-b border-border/70 bg-card/95 pt-safe backdrop-blur-xl",
      className,
    )}
  >
    <div className="px-5 pb-3.5 pt-3.5">{children}</div>
  </header>
);

const Avatar = () => {
  const { customer } = useSession();

  return (
    <Link
      to="/perfil"
      aria-label="Abrir meu perfil"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-cyan font-display text-sm font-extrabold text-primary-foreground shadow-brand transition-transform active:scale-95"
    >
      {initialsFromName(customer.name)}
    </Link>
  );
};

/** Cabeçalho do Dashboard: saudação + avatar. */
export const HomeHeader = () => {
  const { customer } = useSession();

  return (
    <AppHeader>
      <div className="flex items-center gap-3">
        <Logo variant="symbol" className="h-9 w-9 animate-fade-in" />
        <div className="min-w-0 flex-1">
          <h1 className="animate-fade-up truncate font-display text-lg font-extrabold leading-tight text-deep">
            Olá, {customer.firstName}! 👋
          </h1>
          <p className="truncate text-xs text-muted-foreground">
            Que bom ter você com a Vexfo.
          </p>
        </div>
        <Avatar />
      </div>
    </AppHeader>
  );
};

/** Cabeçalho simples das telas de aba. */
export const TabHeader = ({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) => (
  <AppHeader>
    <div className="flex items-end justify-between gap-3">
      <div className="min-w-0">
        <h1 className="truncate font-display text-xl font-extrabold text-deep">
          {title}
        </h1>
        {subtitle ? (
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {right}
    </div>
  </AppHeader>
);

/** Cabeçalho das telas internas, com ação de voltar. */
export const PageHeader = ({
  title,
  subtitle,
  right,
  fallbackTo = "/inicio",
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  fallbackTo?: string;
}) => {
  const navigate = useNavigate();

  const goBack = () => {
    const index =
      (window.history.state as { idx?: number } | null)?.idx ?? 0;
    if (index > 0) {
      navigate(-1);
    } else {
      navigate(fallbackTo);
    }
  };

  return (
    <header className="z-30 shrink-0 border-b border-border/70 bg-card/95 pt-safe backdrop-blur-xl">
      <div className="flex items-center gap-3 px-4 pb-3 pt-3">
        <button
          type="button"
          aria-label="Voltar"
          onClick={goBack}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-deep transition-transform active:scale-90"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-base font-extrabold text-deep">
            {title}
          </h1>
          {subtitle ? (
            <p className="truncate text-[11px] text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </div>
        {right}
      </div>
    </header>
  );
};
