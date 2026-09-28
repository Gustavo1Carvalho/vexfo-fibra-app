import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl font-semibold transition-[transform,background-color,color,box-shadow,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 active:scale-[0.97] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Ação principal da marca (gradiente azul → ciano). */
        brand: "bg-gradient-cyan text-primary-foreground shadow-brand",
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        soft: "bg-primary/10 text-primary hover:bg-primary/15",
        success: "bg-gradient-success text-success-foreground shadow-success",
        outline: "border border-border bg-card text-foreground hover:bg-muted",
        brandOutline:
          "border border-primary/25 bg-primary/5 text-primary hover:bg-primary/10",
        dangerOutline:
          "border border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive/10",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 px-4 text-sm [&_svg]:size-4",
        default: "h-12 px-5 text-[15px] [&_svg]:size-[18px]",
        lg: "h-14 px-6 text-base [&_svg]:size-5",
        /** Botão grande de largura total, padrão do app. */
        xl: "h-14 w-full px-6 text-base [&_svg]:size-5",
        icon: "h-11 w-11 rounded-full [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
