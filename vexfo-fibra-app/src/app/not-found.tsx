import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";
import { Button } from "@/components/vexfo/Button";
import { Logo } from "@/components/vexfo/Logo";
import { Screen } from "@/components/vexfo/Screen";

/** Página não encontrada, mantendo a identidade do aplicativo. */
export const NaoEncontrado = () => {
  const navigate = useNavigate();

  return (
    <Screen bottomSafe scroll={false} contentClassName="px-6">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <Logo variant="symbol" className="h-14" />
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Compass className="h-7 w-7" strokeWidth={1.8} />
        </span>
        <div>
          <p className="font-display text-lg font-extrabold text-deep">
            Não encontramos esta tela
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            O endereço acessado não existe no Portal do Assinante.
          </p>
        </div>
        <Button
          variant="brand"
          size="xl"
          className="mt-2"
          onClick={() => navigate("/inicio", { replace: true })}
        >
          Ir para o início
        </Button>
      </div>
    </Screen>
  );
};
