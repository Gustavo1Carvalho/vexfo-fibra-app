import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useOverlayContainer } from "@/hooks/use-overlay-container";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
}

/**
 * Modal no formato bottom sheet, renderizado dentro da moldura do celular
 * (nunca por cima da página inteira do navegador).
 */
export const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
}: ModalProps) => {
  const container = useOverlayContainer();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  if (!container) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="pointer-events-auto absolute inset-0 z-50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => onOpenChange(false)}
            className="absolute inset-0 h-full w-full bg-deep/50 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="relative w-full rounded-t-sheet border-t border-border/60 bg-card px-5 pt-3 shadow-elevated"
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" />
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-base font-extrabold text-deep">
                  {title}
                </h2>
                {description ? (
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                aria-label="Fechar"
                onClick={() => onOpenChange(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform active:scale-90"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {children ? <div className="mt-4">{children}</div> : null}
            {footer ? (
              <div className="mt-5 flex gap-2">{footer}</div>
            ) : null}

            <div aria-hidden className="h-6 pb-safe" />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    container,
  );
};
