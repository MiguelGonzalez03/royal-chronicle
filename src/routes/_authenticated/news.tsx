import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/news")({
  component: NewsPage,
});

function NewsPage() {
  const { data } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data } = await supabase.from("news").select("*").order("published_at", { ascending: false });
      return data ?? [];
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <PageHeader title="Crónicas del Reino" subtitle="Pergaminos con las últimas nuevas de Crusader Kings III" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((n) => (
          <article key={n.id} className="parchment rounded-lg overflow-hidden flex flex-col">
            {n.image_url && (
              <div className="aspect-video overflow-hidden">
                <img src={n.image_url} alt={n.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
            )}
            <div className="p-5 flex-1 flex flex-col">
              <p className="text-xs text-gold/70 uppercase tracking-wider">
                {new Date(n.published_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
              </p>
              <h2 className="font-display text-xl text-gold mt-1 line-clamp-2">{n.title}</h2>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3 flex-1">{n.summary}</p>
              <Link to="/news/$id" params={{ id: n.id }} className="mt-4">
                <Button variant="outline" className="border-gold/40 text-gold hover:bg-gold/10 w-full">Leer más</Button>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}