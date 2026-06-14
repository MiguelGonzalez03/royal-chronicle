import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { MessageSquare, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/community/")({
  component: CommunityIndex,
});

function CommunityIndex() {
  const { data: cats } = useQuery({
    queryKey: ["forum-categories"],
    queryFn: async () => {
      const { data } = await supabase.from("forum_categories").select("*").order("sort_order");
      return data ?? [];
    },
  });
  const { data: recent } = useQuery({
    queryKey: ["forum-recent"],
    queryFn: async () => {
      const { data } = await supabase
        .from("posts")
        .select("id, title, created_at, profiles:profiles!posts_user_id_fkey(username)")
        .order("created_at", { ascending: false })
        .limit(5);
      return data ?? [];
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <PageHeader
        title="El Salón del Trono"
        subtitle="Reúnete con la comunidad y comparte tus crónicas"
        action={
          <Link to="/community/new">
            <Button className="bg-gradient-gold text-primary-foreground font-display">
              <Plus className="h-4 w-4 mr-2" /> Nuevo Pergamino
            </Button>
          </Link>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          {cats?.map((c) => (
            <Link key={c.id} to="/community/$category" params={{ category: c.slug }} className="parchment rounded-lg p-5 hover:shadow-gold-glow transition">
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-gold mt-1" />
                <div>
                  <h3 className="font-display text-lg text-gold">{c.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{c.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <aside className="parchment rounded-lg p-5 h-fit">
          <h3 className="font-display text-lg text-gold mb-3">Pergaminos Recientes</h3>
          <div className="divider-ornate mb-4" />
          <ul className="space-y-3">
            {recent?.map((p: any) => (
              <li key={p.id}>
                <Link to="/community/post/$id" params={{ id: p.id }} className="block hover:text-gold transition">
                  <p className="text-sm font-medium line-clamp-1">{p.title}</p>
                  <p className="text-xs text-muted-foreground">
                    por {p.profiles?.username ?? "Anónimo"} · {new Date(p.created_at).toLocaleDateString("es-ES")}
                  </p>
                </Link>
              </li>
            ))}
            {!recent?.length && <p className="text-sm text-muted-foreground italic">Aún no hay publicaciones.</p>}
          </ul>
        </aside>
      </div>
    </div>
  );
}