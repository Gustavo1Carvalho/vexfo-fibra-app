import { MapPin } from "lucide-react";
import { Card } from "@/components/vexfo/Card";
import { PageHeader } from "@/components/vexfo/Header";
import { Screen } from "@/components/vexfo/Screen";
import { useSession } from "@/context/session";

const AddressRow = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[11px] font-semibold text-muted-foreground">{label}</p>
    <p className="mt-0.5 text-sm font-bold text-deep">{value}</p>
  </div>
);

/** Endereço onde a fibra está instalada. */
export const EnderecoInstalacao = () => {
  const { customer } = useSession();
  const { address } = customer;

  return (
    <Screen
      bottomSafe
      header={
        <PageHeader title="Endereço de instalação" fallbackTo="/perfil" />
      }
      contentClassName="space-y-5 px-5 pb-6 pt-4"
    >
      <Card className="space-y-4">
        <AddressRow
          label="Logradouro"
          value={`${address.street}, ${address.number}`}
        />
        <div className="h-px bg-border" />
        <AddressRow label="Complemento" value={address.complement} />
        <div className="h-px bg-border" />
        <AddressRow label="Bairro" value={address.district} />
        <div className="h-px bg-border" />
        <AddressRow
          label="Cidade"
          value={`${address.city} - ${address.state}`}
        />
        <div className="h-px bg-border" />
        <AddressRow label="CEP" value={address.zip} />
      </Card>

      <div className="flex h-44 flex-col items-center justify-center gap-2 rounded-app border border-dashed border-border bg-card/70">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MapPin className="h-5 w-5" strokeWidth={2.2} />
        </span>
        <p className="text-xs font-bold text-deep">Mapa da instalação</p>
        <p className="text-[11px] text-muted-foreground">
          Visualização disponível em breve
        </p>
      </div>
    </Screen>
  );
};
