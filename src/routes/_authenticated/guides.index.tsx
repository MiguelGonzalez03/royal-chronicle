import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Plus, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/guides/")({
  component: GuidesList,
});

const LABEL: Record<string, string> = { beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzado" };

function GuidesList() {
  const { data } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const { data } = await supabase
        .from("guides")
        .select("id, title, content, difficulty, created_at, profiles:profiles!guides_user_id_fkey(username)")
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <PageHeader
        title="Códices y Guías"
        subtitle="Sabiduría compilada por la comunidad"
        action={
          <Link to="/guides/new">
            <Button className="bg-gradient-gold text-primary-foreground"><Plus className="h-4 w-4 mr-2" />Escribir guía</Button>
          </Link>
        }
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.map((g: any) => (
          <Link key={g.id} to="/guides/$id" params={{ id: g.id }} className="parchment rounded-lg p-5 hover:shadow-gold-glow transition">
            <div className="flex items-start gap-3">
              <BookOpen className="h-5 w-5 text-gold mt-1" />
              <div className="flex-1">
                <h3 className="font-display text-lg text-gold line-clamp-2">{g.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{g.content}</p>
                <div className="flex items-center justify-between mt-3">
                  <Badge className="bg-gradient-gold text-primary-foreground">{LABEL[g.difficulty]}</Badge>
                  <span className="text-xs text-muted-foreground">por {g.profiles?.username ?? "Anónimo"}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {!data?.length && <p className="text-muted-foreground italic col-span-full">Aún no hay guías. ¡Escribe la primera!</p>}
      </div>
    </div>
  );
}