import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Crown, Newspaper, Package, Users, BookOpen, Swords, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroMap from "@/assets/hero-map.jpg";
import shield from "@/assets/shield.png";

export const Route = createFileRoute("/_authenticated/")({
  component: Home,
});

const TILES = [
  { to: "/news", label: "Crónicas del Reino", desc: "Las últimas noticias", icon: Newspaper },
  { to: "/dlcs", label: "Expansiones", desc: "Conoce todos los DLCs", icon: Package },
  { to: "/community", label: "El Salón del Trono", desc: "Foro de la comunidad", icon: Users },
  { to: "/guides", label: "Códices y Guías", desc: "Aprende a reinar", icon: BookOpen },
  { to: "/characters", label: "Casas Notables", desc: "Personajes recomendados", icon: Swords },
  { to: "/profile", label: "Tu Estandarte", desc: "Perfil y logros", icon: Crown },
] as const;

function Home() {
  const { data: news } = useQuery({
    queryKey: ["home-news"],
    queryFn: async () => {
      const { data } = await supabase.from("news").select("*").order("published_at", { ascending: false }).limit(3);
      return data ?? [];
    },
  });

  return (
    <div>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src={heroMap} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center">
          <img src={shield} alt="" className="h-28 w-28 mb-4 drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]" loading="lazy" />
          <h1 className="font-display text-5xl md:text-7xl text-gold tracking-widest drop-shadow-lg">REINO</h1>
          <p className="mt-3 text-lg md:text-xl text-foreground/90 italic font-display tracking-wide">
            La comunidad medieval de Crusader Kings III
          </p>
          <div className="divider-ornate w-72 mt-6" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-display text-3xl text-gold text-center mb-8 tracking-wider">El Gran Salón</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TILES.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="group parchment rounded-lg p-6 hover:shadow-gold-glow hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-gold grid place-items-center text-primary-foreground shadow-royal">
                  <t.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-gold tracking-wide">{t.label}</h3>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-3xl text-gold tracking-wider">Últimas Noticias</h2>
          <Link to="/news" className="text-gold/80 hover:text-gold text-sm flex items-center gap-1">
            Ver todas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {news?.map((n) => (
            <Link key={n.id} to="/news/$id" params={{ id: n.id }} className="parchment rounded-lg overflow-hidden group">
              {n.image_url && (
                <div className="aspect-video overflow-hidden">
                  <img src={n.image_url} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition" loading="lazy" />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-display text-lg text-gold line-clamp-2">{n.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{n.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}