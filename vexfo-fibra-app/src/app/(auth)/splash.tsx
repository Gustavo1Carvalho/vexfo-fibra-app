import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Logo } from "@/components/vexfo/Logo";

/**
 * Abertura do app: logo Vexfo Fibra com animação leve e redirecionamento
 * automático para a tela de login.
 */
export const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(
      () => navigate("/login", { replace: true }),
      2400,
    );
    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-gradient-surface px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center justify-center"
      >
        <span
          aria-hidden
          className="absolute h-52 w-52 animate-pulse-ring rounded-full bg-accent/20"
        />
        <Logo variant="lockup" className="logo-glow relative h-44" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative mt-6 text-center text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground"
      >
        Portal do Assinante
      </motion.p>

      <div className="absolute inset-x-0 bottom-0">
        <div className="px-10 pb-10">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div className="h-full w-full origin-left animate-bar-fill rounded-full bg-gradient-cyan" />
          </div>
        </div>
        <div aria-hidden className="pb-safe" />
      </div>
    </div>
  );
};
