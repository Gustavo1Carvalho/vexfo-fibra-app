export type ToastTone = "success" | "info" | "error";

export interface ToastItem {
  id: number;
  tone: ToastTone;
  message: string;
  description?: string;
}

type ToastListener = (item: ToastItem) => void;

/**
 * Store mínimo de toasts, fora do React, para permitir
 * `toast.success("PIX copiado!")` de qualquer lugar da aplicação.
 * O `ToastProvider` registra o listener que efetivamente renderiza os avisos.
 */
let listener: ToastListener | null = null;
let sequence = 0;

export const registerToastListener = (next: ToastListener | null): void => {
  listener = next;
};

export const pushToast = (
  tone: ToastTone,
  message: string,
  description?: string,
): void => {
  sequence += 1;
  listener?.({ id: sequence, tone, message, description });
};

export const toast = {
  success: (message: string, description?: string) =>
    pushToast("success", message, description),
  info: (message: string, description?: string) =>
    pushToast("info", message, description),
  error: (message: string, description?: string) =>
    pushToast("error", message, description),
};
