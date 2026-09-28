import { useNavigate } from "react-router-dom";
import { Mail, Phone, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@/components/vexfo/Button";
import { Card } from "@/components/vexfo/Card";
import { PageHeader } from "@/components/vexfo/Header";
import { InfoRow } from "@/components/vexfo/InfoRow";
import { Screen } from "@/components/vexfo/Screen";
import { useSession } from "@/context/session";
import { maskCpf } from "@/lib/format";

/** Dados cadastrais do assinante (somente leitura nesta etapa). */
export const DadosPessoais = () => {
  const navigate = useNavigate();
  const { customer } = useSession();

  return (
    <Screen
      bottomSafe
      header={<PageHeader title="Dados pessoais" fallbackTo="/perfil" />}
      contentClassName="space-y-5 px-5 pb-6 pt-4"
    >
      <Card className="space-y-4">
        <InfoRow icon={UserRound} label="Nome completo" value={customer.name} />
        <div className="h-px bg-border" />
        <InfoRow icon={ShieldCheck} label="CPF" value={maskCpf(customer.cpf)} />
        <div className="h-px bg-border" />
        <InfoRow icon={Phone} label="Telefone" value={customer.phone} />
        <div className="h-px bg-border" />
        <InfoRow icon={Mail} label="E-mail" value={customer.email} />
      </Card>

      <div className="rounded-app border border-dashed border-border bg-card/70 p-3.5">
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Para alterar seus dados cadastrais, fale com a nossa central de
          atendimento. A edição pelo aplicativo será liberada em uma próxima
          etapa.
        </p>
      </div>

      <Button
        variant="brandOutline"
        size="xl"
        onClick={() => navigate("/contato")}
      >
        Falar com a Vexfo
      </Button>
    </Screen>
  );
};
