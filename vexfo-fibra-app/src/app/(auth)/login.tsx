import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@/components/vexfo/Button";
import { Logo } from "@/components/vexfo/Logo";
import { TextField } from "@/components/vexfo/TextField";
import { useSession } from "@/context/session";
import { formatCpf, onlyDigits } from "@/lib/format";

interface LoginErrors {
  cpf?: string;
  password?: string;
}

/**
 * Tela de login. Funciona apenas como demonstração: não há autenticação real
 * nesta etapa, o botão Entrar só simula um carregamento e abre o Dashboard.
 */
export const Login = () => {
  const navigate = useNavigate();
  const { login } = useSession();

  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: LoginErrors = {};
    if (onlyDigits(cpf).length !== 11) {
      nextErrors.cpf = "Informe um CPF com 11 dígitos.";
    }
    if (onlyDigits(password).length < 4) {
      nextErrors.password = "Informe os 4 últimos dígitos do seu CPF.";
    }

    setErrors(nextErrors);
    if (nextErrors.cpf || nextErrors.password) return;

    setSubmitting(true);
    window.setTimeout(() => {
      login();
      navigate("/inicio", { replace: true });
    }, 1100);
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="app-scroll relative min-h-0 flex-1 px-6 pt-safe">
        <div className="flex justify-center pt-12">
          <Logo variant="lockup" className="logo-glow h-32" />
        </div>

        <div className="mt-9 animate-fade-up">
          <h1 className="font-display text-[26px] font-extrabold leading-tight text-deep">
            Olá! 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Acesse sua conta Vexfo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 pb-8">
          <TextField
            label="CPF"
            name="cpf"
            icon={UserRound}
            inputMode="numeric"
            autoComplete="off"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(event) => setCpf(formatCpf(event.target.value))}
            error={errors.cpf}
          />

          <TextField
            label="Senha"
            name="password"
            icon={ShieldCheck}
            type="password"
            inputMode="numeric"
            placeholder="Digite sua senha"
            value={password}
            onChange={(event) =>
              setPassword(onlyDigits(event.target.value).slice(0, 4))
            }
            hint="Sua senha são os últimos 4 dígitos do seu CPF"
            error={errors.password}
          />

          <Button type="submit" size="xl" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => navigate("/esqueci-senha")}
          className="mx-auto mb-6 block text-sm font-semibold text-primary transition-opacity active:opacity-60"
        >
          Esqueci minha senha
        </button>

        <div className="mb-8 rounded-2xl border border-dashed border-border bg-card/70 p-3.5 text-center">
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Demonstração: qualquer CPF com 11 dígitos e uma senha de 4 dígitos
            entram no aplicativo. Nenhum dado é enviado.
          </p>
        </div>
      </div>

      <div aria-hidden className="pb-safe" />
    </div>
  );
};
