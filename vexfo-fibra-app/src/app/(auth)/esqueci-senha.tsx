import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";
import { Button } from "@/components/vexfo/Button";
import { Card } from "@/components/vexfo/Card";
import { PageHeader } from "@/components/vexfo/Header";
import { Screen } from "@/components/vexfo/Screen";
import { SuccessState } from "@/components/vexfo/SuccessState";
import { TextField } from "@/components/vexfo/TextField";
import { formatCpf, onlyDigits } from "@/lib/format";

/** Recuperação de senha — apenas visual, nenhum e-mail é disparado nesta etapa. */
export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState<string>();
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (onlyDigits(cpf).length !== 11) {
      setError("Informe um CPF com 11 dígitos.");
      return;
    }

    setError(undefined);
    setSent(true);
  };

  return (
    <Screen
      bottomSafe
      header={<PageHeader title="Esqueci minha senha" fallbackTo="/login" />}
      contentClassName="px-5 pb-6 pt-4"
    >
      {sent ? (
        <SuccessState
          title="Instruções enviadas!"
          description="Em um ambiente real, você receberia um link de redefinição de senha. Nesta demonstração nada é enviado."
          action={
            <Button
              variant="brand"
              size="xl"
              onClick={() => navigate("/login", { replace: true })}
            >
              Voltar para o login
            </Button>
          }
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <Card className="space-y-2">
            <p className="font-display text-sm font-bold text-deep">
              Vamos redefinir sua senha
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Informe o CPF cadastrado e enviaremos as instruções de acesso.
            </p>
          </Card>

          <TextField
            label="CPF"
            name="cpf"
            icon={UserRound}
            inputMode="numeric"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(event) => setCpf(formatCpf(event.target.value))}
            error={error}
          />

          <Button type="submit" size="xl">
            Enviar instruções
          </Button>
        </form>
      )}
    </Screen>
  );
};
