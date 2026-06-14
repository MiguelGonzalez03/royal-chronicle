import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Crown,
  Newspaper,
  Package,
  Users,
  BookOpen,
  Swords,
  User as UserIcon,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV: Array<{ to: string; label: string; icon: typeof Crown; exact?: boolean }> = [
  { to: "/", label: "Inicio", icon: Crown, exact: true },
  { to: "/news", label: "Noticias", icon: Newspaper },
  { to: "/dlcs", label: "DLCs", icon: Package },
  { to: "/community", label: "Comunidad", icon: Users },
  { to: "/guides", label: "Guías", icon: BookOpen },
  { to: "/characters", label: "Personajes", icon: Swords },
  { to: "/profile", label: "Perfil", icon: UserIcon },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [router.state.location.pathname]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-[color:var(--gold)]/30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <Crown className="h-6 w-6 text-gold group-hover:scale-110 transition" />
            <span className="font-display text-xl tracking-widest text-gold">REINO</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to as any}
                activeProps={{ className: "text-gold bg-secondary/60" }}
                activeOptions={{ exact: item.exact ?? false }}
                className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-gold hover:bg-secondary/40 transition flex items-center gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex">
            <Button variant="ghost" size="sm" onClick={signOut} className="text-foreground/80 hover:text-gold">
              <LogOut className="h-4 w-4 mr-2" /> Salir
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-gold"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menú"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-[color:var(--gold)]/30 bg-background/95">
            <nav className="flex flex-col p-2">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to as any}
                  activeProps={{ className: "text-gold bg-secondary/60" }}
                  activeOptions={{ exact: item.exact ?? false }}
                  className="px-3 py-3 rounded-md text-sm font-medium flex items-center gap-3 hover:bg-secondary/40"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
              <button
                onClick={signOut}
                className={cn("px-3 py-3 rounded-md text-sm font-medium flex items-center gap-3 hover:bg-secondary/40 text-left")}
              >
                <LogOut className="h-4 w-4" /> Cerrar Sesión
              </button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[color:var(--gold)]/30 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground font-display tracking-wider">
          ❖ REINO · Forjado por la comunidad de Crusader Kings III ❖
        </div>
      </footer>
    </div>
  );
}