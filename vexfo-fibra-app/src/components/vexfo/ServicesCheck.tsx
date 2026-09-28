import { Check, X } from "lucide-react";
import { Card } from "@/components/vexfo/Card";
import { cn } from "@/lib/utils";

interface ServicesCheckProps {
  items: Array<{ label: string; ok: boolean }>;
  className?: string;
}

/** Lista de verificação dos serviços da conexão. */
export const ServicesCheck = ({ items, className }: ServicesCheckProps) => (
  <Card className={cn("space-y-3.5", className)}>
    {items.map((item) => (
      <div key={item.label} className="flex items-center gap-3">
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
            item.ok
              ? "bg-success/15 text-success-foreground"
              : "bg-destructive/10 text-destructive",
          )}
        >
          {item.ok ? (
            <Check className="h-4 w-4" strokeWidth={3} />
          ) : (
            <X className="h-4 w-4" strokeWidth={3} />
          )}
        </span>
        <p className="flex-1 truncate text-sm font-semibold text-deep">
          {item.label}
        </p>
        <span
          className={cn(
            "text-[11px] font-bold",
            item.ok ? "text-success-foreground" : "text-destructive",
          )}
        >
          {item.ok ? "Normal" : "Atenção"}
        </span>
      </div>
    ))}
  </Card>
);
