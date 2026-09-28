import { NavLink } from "react-router-dom";
import { CreditCard, Headphones, Home, User, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

const TABS: TabItem[] = [
  { to: "/inicio", label: "Início", icon: Home },
  { to: "/faturas", label: "Faturas", icon: CreditCard },
  { to: "/suporte", label: "Suporte", icon: Headphones },
  { to: "/perfil", label: "Perfil", icon: User },
];

export const TabBar = () => (
  <nav className="z-30 shrink-0 border-t border-border/70 bg-card/95 pb-safe backdrop-blur-xl">
    <div className="grid grid-cols-4 px-2 pt-1.5">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className="flex flex-col items-center gap-1 py-1.5"
        >
          {({ isActive }) => (
            <>
              <span
                className={cn(
                  "flex h-9 w-14 items-center justify-center rounded-full transition-all duration-200",
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground",
                )}
              >
                <tab.icon
                  className={cn(
                    "h-[22px] w-[22px] transition-transform duration-200",
                    isActive && "scale-110",
                  )}
                  strokeWidth={isActive ? 2.4 : 2}
                />
              </span>
              <span
                className={cn(
                  "text-[11px] font-semibold transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                {tab.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  </nav>
);
