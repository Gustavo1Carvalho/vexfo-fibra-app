import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleAlert, Info, type LucideIcon } from "lucide-react";
import { useOverlayContainer } from "@/hooks/use-overlay-container";
import { registerToastListener, type ToastItem, type ToastTone } from "@/lib/toast";
import { cn } from "@/lib/utils";

const TONES: Record<ToastTone, { icon: LucideIcon; className: string }> = {
  success: {
    icon: CheckCircle2,
    className: "bg-success/15 text-success-foreground",
  },
  info: { icon: Info, className: "bg-primary/10 text-primary" },
  error: { icon: CircleAlert, className: "bg-destructive/10 text-destructive" },
};

const ToastCard = ({ item }: { item: ToastItem }) => {
  const tone = TONES[item.tone];
  const Icon = tone.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -14, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 34 }}
      className="pointer-events-auto flex w-full items-center gap-3 rounded-2xl border border-border/70 bg-card px-3.5 py-3 shadow-elevated"
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
          tone.className,
        )}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={2.4} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-bold text-deep">
          {item.message}
        </p>
        {item.description ? (
          <p className="truncate text-[11px] text-muted-foreground">
            {item.description}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
};

/**
 * Renderiza os toasts dentro da moldura do celular.
 * Use `toast.success("...")` de qualquer componente (src/lib/toast.ts).
 */
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ToastItem[]>([]);
  const container = useOverlayContainer();

  useEffect(() => {
    registerToastListener((item) => {
      setItems((previous) => [...previous, item].slice(-3));
      window.setTimeout(() => {
        setItems((previous) => previous.filter((current) => current.id !== item.id));
      }, 2800);
    });

    return () => registerToastListener(null);
  }, []);

  return (
    <>
      {children}
      {container
        ? createPortal(
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[60] px-4 pt-safe">
              <div className="mt-3 flex flex-col gap-2">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <ToastCard key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              </div>
            </div>,
            container,
          )
        : null}
    </>
  );
};
