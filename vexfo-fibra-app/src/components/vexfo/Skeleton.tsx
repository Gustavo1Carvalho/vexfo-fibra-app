import { cn } from "@/lib/utils";

/** Bloco de carregamento com brilho deslizante. */
export const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-2xl bg-border/60",
      className,
    )}
  >
    <div
      aria-hidden
      className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-card to-transparent"
    />
  </div>
);

/** Placeholder no formato de um card, para listas e dashboard. */
export const SkeletonCard = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "space-y-3 rounded-app border border-border/60 bg-card p-4 shadow-card",
      className,
    )}
  >
    <div className="flex items-center gap-3">
      <Skeleton className="h-11 w-11 rounded-2xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
    <Skeleton className="h-16 w-full" />
    <div className="flex gap-2">
      <Skeleton className="h-10 flex-1" />
      <Skeleton className="h-10 flex-1" />
    </div>
  </div>
);
