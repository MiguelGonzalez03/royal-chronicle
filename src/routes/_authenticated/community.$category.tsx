import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/community/$category")({
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();

  const { data: cat } = useQuery({
    queryKey: ["forum-cat", category],
    queryFn: async () => {
      const { data } = await supabase.from("forum_categories").select("*").eq("slug", category).maybeSingle();
      return data;
    },
  });

  const { data: posts } = useQuery({
    queryKey: ["posts-by-cat", cat?.id],
    enabled: !!cat?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from("posts")
        .select("id, title, content, created_at, profiles:profiles!posts_user_id_fkey(username, avatar_url)")
        .eq("category_id", cat!.id)
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link to="/community" className="inline-flex items-center gap-2 text-gold/80 hover:text-gold mb-4 text-sm">
        <ArrowLeft className="h-4 w-4" /> Volver al foro
      </Link>
      <PageHeader
        title={cat?.name ?? "Categoría"}
        subtitle={cat?.description ?? undefined}
        action={
          <Link to="/community/new" search={{ category }}>
            <Button className="bg-gradient-gold text-primary-foreground"><Plus className="h-4 w-4 mr-2" />Publicar</Button>
          </Link>
        }
      />

      <div className="space-y-3">
        {posts?.map((p: any) => (
          <Link key={p.id} to="/community/post/$id" params={{ id: p.id }} className="block parchment rounded-lg p-5 hover:shadow-gold-glow transition">
            <h3 className="font-display text-lg text-gold">{p.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.content}</p>
            <p className="text-xs text-muted-foreground mt-2">
              por {p.profiles?.username ?? "Anónimo"} · {new Date(p.created_at).toLocaleDateString("es-ES")}
            </p>
          </Link>
        ))}
        {!posts?.length && <p className="text-muted-foreground italic">Aún no hay pergaminos en esta categoría. ¡Sé el primero!</p>}
      </div>
    </div>
  );
}