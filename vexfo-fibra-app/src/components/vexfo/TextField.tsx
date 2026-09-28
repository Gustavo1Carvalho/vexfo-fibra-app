import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const fieldShell =
  "h-14 rounded-2xl border-border bg-card text-base shadow-none placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  icon?: LucideIcon;
}

export const TextField = ({
  label,
  hint,
  error,
  icon: Icon,
  className,
  id,
  name,
  ...props
}: TextFieldProps) => {
  const fieldId = id ?? name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={fieldId}
        className="block px-1 text-xs font-bold text-deep"
      >
        {label}
      </label>
      <div className="relative">
        {Icon ? (
          <Icon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        ) : null}
        <Input
          id={fieldId}
          name={name}
          aria-invalid={Boolean(error)}
          className={cn(
            fieldShell,
            "pl-12 pr-4",
            !Icon && "pl-4",
            error &&
              "border-destructive/60 focus-visible:ring-destructive/30",
            className,
          )}
          {...props}
        />
      </div>
      {error ? (
        <p className="px-1 text-[11px] font-semibold text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="px-1 text-[11px] leading-relaxed text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
};

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string;
}

export const TextAreaField = ({
  label,
  hint,
  error,
  className,
  id,
  name,
  ...props
}: TextAreaFieldProps) => {
  const fieldId = id ?? name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={fieldId}
        className="block px-1 text-xs font-bold text-deep"
      >
        {label}
      </label>
      <Textarea
        id={fieldId}
        name={name}
        aria-invalid={Boolean(error)}
        className={cn(
          "min-h-[7.5rem] rounded-2xl border-border bg-card p-4 text-base leading-relaxed shadow-none placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0",
          error && "border-destructive/60 focus-visible:ring-destructive/30",
          className,
        )}
        {...props}
      />
      {error ? (
        <p className="px-1 text-[11px] font-semibold text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="px-1 text-[11px] leading-relaxed text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
};
