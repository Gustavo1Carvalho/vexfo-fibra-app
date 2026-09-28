import { useCallback } from "react";
import { copyToClipboard } from "@/lib/format";
import { toast } from "@/lib/toast";

/** Copia o código PIX e informa o resultado por toast. */
export const useCopyPix = () =>
  useCallback(async (pixCode: string) => {
    const copied = await copyToClipboard(pixCode);
    if (copied) {
      toast.success("PIX copiado!", "Cole no aplicativo do seu banco para pagar.");
    } else {
      toast.error("Não foi possível copiar", "Selecione o código manualmente.");
    }
  }, []);
