import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/news/$id")({
  component: NewsDetail,
});

function NewsDetail() {
  const { id } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["news", id],
    queryFn: async () => {
      const { data } = await supabase.from("news").select("*").eq("id", id).maybeSingle();
      return data;
    },
  });

  if (isLoading) return <div className="max-w-3xl mx-auto px-4 py-16 text-muted-foreground">Cargando pergamino…</div>;
  if (!data) return <div className="max-w-3xl mx-auto px-4 py-16">Noticia no encontrada.</div>;

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <Link to="/news" className="inline-flex items-center gap-2 text-gold/80 hover:text-gold mb-6">
        <ArrowLeft className="h-4 w-4" /> Volver a noticias
      </Link>
      {data.image_url && (
        <img src={data.image_url} alt={data.title} className="w-full aspect-video object-cover rounded-lg parchment" />
      )}
      <p className="text-xs text-gold/70 uppercase tracking-wider mt-6">
        {new Date(data.published_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
      </p>
      <h1 className="font-display text-4xl text-gold mt-2">{data.title}</h1>
      <div className="divider-ornate my-6" />
      <p className="text-lg text-foreground/90 italic">{data.summary}</p>
      <div className="mt-6 text-foreground/90 leading-relaxed whitespace-pre-line">{data.content}</div>
    </article>
  );
}