import { useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/vexfo/Button";
import { Card } from "@/components/vexfo/Card";
import { PageHeader } from "@/components/vexfo/Header";
import { Screen } from "@/components/vexfo/Screen";
import { SuccessState } from "@/components/vexfo/SuccessState";
import { TextAreaField, TextField } from "@/components/vexfo/TextField";
import { useSession } from "@/context/session";
import type { Ticket } from "@/data";

interface FormErrors {
  subject?: string;
  description?: string;
}

/**
 * Abertura de chamado. O envio é apenas demonstrativo: nenhum chamado sai do
 * aplicativo, ele é apenas registrado na sessão em memória.
 */
export const NovoChamado = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { createTicket } = useSession();

  const [subject, setSubject] = useState(searchParams.get("assunto") ?? "");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState<Ticket | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (subject.trim().length < 4) {
      nextErrors.subject = "Descreva o assunto em poucas palavras.";
    }
    if (description.trim().length < 12) {
      nextErrors.description = "Conte um pouco mais sobre o problema.";
    }

    setErrors(nextErrors);
    if (nextErrors.subject || nextErrors.description) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setCreated(createTicket({ subject, description }));
      setSubmitting(false);
    }, 900);
  };

  if (created) {
    return (
      <Screen
        bottomSafe
        header={
          <PageHeader
            title="Chamado enviado"
            subtitle={created.protocol}
            fallbackTo="/suporte"
          />
        }
        contentClassName="px-5 pb-6 pt-4"
      >
        <SuccessState
          title="Chamado enviado!"
          description="Seu atendimento foi registrado. Você pode acompanhar o andamento em Meus chamados."
          action={
            <div className="space-y-2">
              <Button
                variant="brand"
                size="xl"
                onClick={() => navigate("/chamados")}
              >
                Ver meus chamados
              </Button>
              <Button
                variant="ghost"
                size="default"
                className="w-full"
                onClick={() => navigate("/inicio")}
              >
                Voltar para o início
              </Button>
            </div>
          }
        >
          <div className="mx-auto w-full max-w-[17rem] rounded-2xl border border-border bg-card px-4 py-3 text-center shadow-card">
            <p className="text-[11px] font-semibold text-muted-foreground">
              Protocolo
            </p>
            <p className="font-display text-lg font-extrabold text-deep">
              {created.protocol}
            </p>
          </div>
        </SuccessState>
      </Screen>
    );
  }

  return (
    <Screen
      bottomSafe
      header={
        <PageHeader title="Solicitar suporte" fallbackTo="/suporte" />
      }
      contentClassName="space-y-5 px-5 pb-6 pt-4"
    >
      <Card className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Send className="h-[18px] w-[18px]" strokeWidth={2.2} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-deep">
            Conte o que está acontecendo
          </p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
            Nossa equipe responde todos os dias, 24 horas.
          </p>
        </div>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Assunto"
          name="subject"
          placeholder="Ex.: Estou sem internet"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          error={errors.subject}
        />

        <TextAreaField
          label="Descreva o problema"
          name="description"
          placeholder="Conte os detalhes: desde quando acontece, quais aparelhos estão afetados..."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          error={errors.description}
        />

        <Button type="submit" size="xl" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar chamado"
          )}
        </Button>
      </form>

      <div className="rounded-app border border-dashed border-border bg-card/70 p-3.5">
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Demonstração: o chamado é registrado apenas no aplicativo e não é
          enviado para a central de atendimento nesta etapa.
        </p>
      </div>
    </Screen>
  );
};
