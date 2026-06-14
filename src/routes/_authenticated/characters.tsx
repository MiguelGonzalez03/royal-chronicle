import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Shield, Lightbulb, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/characters")({
  component: CharactersPage,
});

const DIFF_LABEL: Record<string, string> = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado",
};

function CharactersPage() {
  const { data } = useQuery({
    queryKey: ["characters"],
    queryFn: async () => {
      const { data } = await supabase.from("recommended_characters").select("*");
      return data ?? [];
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <PageHeader title="Casas Notables" subtitle="Personajes recomendados para empezar tu legado" />
      <div className="grid md:grid-cols-2 gap-6">
        {data?.map((c) => (
          <article key={c.id} className="parchment rounded-lg overflow-hidden">
            {c.image_url && (
              <img src={c.image_url} alt={c.name} className="w-full aspect-[16/7] object-cover" loading="lazy" />
            )}
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl text-gold">{c.name}</h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Shield className="h-3 w-3 text-gold" /> {c.realm}
                  </p>
                </div>
                <Badge className="bg-gradient-gold text-primary-foreground">{DIFF_LABEL[c.difficulty]}</Badge>
              </div>
              <p className="text-foreground/90 mt-3">{c.description}</p>
              {c.advantages && (
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wider text-gold/80 flex items-center gap-1">
                    <Star className="h-3 w-3" /> Ventajas
                  </p>
                  <p className="text-sm text-muted-foreground">{c.advantages}</p>
                </div>
              )}
              {c.tips && (
                <div className="mt-3">
                  <p className="text-xs uppercase tracking-wider text-gold/80 flex items-center gap-1">
                    <Lightbulb className="h-3 w-3" /> Consejos
                  </p>
                  <p className="text-sm text-muted-foreground">{c.tips}</p>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}