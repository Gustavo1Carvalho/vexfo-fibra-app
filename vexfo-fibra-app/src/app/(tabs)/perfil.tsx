import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gauge, LogOut, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { Button } from "@/components/vexfo/Button";
import { Card } from "@/components/vexfo/Card";
import { TabHeader } from "@/components/vexfo/Header";
import { InfoRow, NavRow } from "@/components/vexfo/InfoRow";
import { Modal } from "@/components/vexfo/Modal";
import { Screen } from "@/components/vexfo/Screen";
import { Section } from "@/components/vexfo/Section";
import { StatusBadge } from "@/components/vexfo/StatusBadge";
import { useSession } from "@/context/session";
import { initialsFromName, maskCpf } from "@/lib/format";
import { mockPlan } from "@/data";

/** Perfil do assinante e atalhos da conta. */
export const Perfil = () => {
  const navigate = useNavigate();
  const { customer, logout } = useSession();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLogout = () => {
    setConfirmOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Screen
      header={<TabHeader title="Meu Perfil" subtitle="Conta e dados cadastrais" />}
      contentClassName="space-y-5 px-5 pb-6 pt-4"
    >
      <Card className="flex flex-col items-center gap-3 py-6 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-cyan font-display text-2xl font-extrabold text-primary-foreground shadow-brand">
          {initialsFromName(customer.name)}
        </span>
        <div>
          <p className="font-display text-lg font-extrabold text-deep">
            {customer.name}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            CPF: {maskCpf(customer.cpf)}
          </p>
        </div>
        <StatusBadge
          tone="success"
          label={`Cliente desde ${customer.customerSince}`}
        />
      </Card>

      <Card className="space-y-4">
        <InfoRow icon={Phone} label="Telefone" value={customer.phone} />
        <div className="h-px bg-border" />
        <InfoRow icon={Mail} label="E-mail" value={customer.email} />
      </Card>

      <Section title="Minha conta">
        <div className="space-y-2.5">
          <NavRow
            icon={Gauge}
            title="Meu plano"
            description={mockPlan.name}
            to="/plano"
          />
          <NavRow
            icon={UserRound}
            title="Dados pessoais"
            description="Nome, CPF e contatos"
            to="/perfil/dados"
          />
          <NavRow
            icon={MapPin}
            title="Endereço de instalação"
            description={`${customer.address.city}/${customer.address.state}`}
            to="/perfil/endereco"
          />
        </div>
      </Section>

      <Button
        variant="dangerOutline"
        size="xl"
        onClick={() => setConfirmOpen(true)}
      >
        <LogOut />
        Sair
      </Button>

      <Modal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Deseja realmente sair?"
        description="Você voltará para a tela de login e precisará informar seu CPF e senha novamente."
        footer={
          <>
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => setConfirmOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              size="lg"
              className="flex-1"
              onClick={handleLogout}
            >
              Sair
            </Button>
          </>
        }
      />
    </Screen>
  );
};
