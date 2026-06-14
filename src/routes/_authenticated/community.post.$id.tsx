import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Heart, Trash2, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/community/post/$id")({
  component: PostDetail,
});

function PostDetail() {
  const { id } = Route.useParams();
  const router = useRouter();
  const qc = useQueryClient();
  const { data: user } = useCurrentUser();
  const [comment, setComment] = useState("");

  const { data: post } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("posts")
        .select("*, profiles:profiles!posts_user_id_fkey(username, avatar_url)")
        .eq("id", id)
        .maybeSingle();
      return data;
    },
  });

  const { data: comments } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("comments")
        .select("*, profiles:profiles!comments_user_id_fkey(username)")
        .eq("post_id", id)
        .order("created_at");
      return data ?? [];
    },
  });

  const { data: likes } = useQuery({
    queryKey: ["likes", id],
    queryFn: async () => {
      const { data } = await supabase.from("likes").select("user_id").eq("post_id", id);
      return data ?? [];
    },
  });

  const hasLiked = !!user && likes?.some((l) => l.user_id === user.id);

  const toggleLike = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Inicia sesión");
      if (hasLiked) {
        await supabase.from("likes").delete().eq("post_id", id).eq("user_id", user.id);
      } else {
        await supabase.from("likes").insert({ post_id: id, user_id: user.id });
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["likes", id] }),
  });

  const addComment = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Inicia sesión");
      if (comment.trim().length < 1) throw new Error("Vacío");
      const { error } = await supabase.from("comments").insert({ post_id: id, user_id: user.id, content: comment.trim() });
      if (error) throw error;
    },
    onSuccess: () => {
      setComment("");
      qc.invalidateQueries({ queryKey: ["comments", id] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deletePost = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Pergamino eliminado");
      router.navigate({ to: "/community" });
    },
  });

  const deleteComment = useMutation({
    mutationFn: async (cid: string) => {
      const { error } = await supabase.from("comments").delete().eq("id", cid);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["comments", id] }),
  });

  if (!post) return <div className="max-w-3xl mx-auto px-4 py-16 text-muted-foreground">Cargando…</div>;

  const isOwner = user?.id === post.user_id;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link to="/community" className="inline-flex items-center gap-2 text-gold/80 hover:text-gold mb-4 text-sm">
        <ArrowLeft className="h-4 w-4" /> Volver al foro
      </Link>
      <article className="parchment rounded-lg p-6">
        <h1 className="font-display text-3xl text-gold">{post.title}</h1>
        <p className="text-xs text-muted-foreground mt-1">
          por {(post as any).profiles?.username ?? "Anónimo"} · {new Date(post.created_at).toLocaleString("es-ES")}
        </p>
        <div className="divider-ornate my-4" />
        <div className="text-foreground/90 whitespace-pre-line leading-relaxed">{post.content}</div>
        <div className="flex items-center gap-3 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleLike.mutate()}
            className={`border-gold/40 ${hasLiked ? "text-accent bg-accent/10" : "text-gold"}`}
          >
            <Heart className={`h-4 w-4 mr-1 ${hasLiked ? "fill-accent" : ""}`} /> {likes?.length ?? 0}
          </Button>
          {isOwner && (
            <Button variant="ghost" size="sm" onClick={() => deletePost.mutate()} className="text-destructive">
              <Trash2 className="h-4 w-4 mr-1" /> Eliminar
            </Button>
          )}
        </div>
      </article>

      <section className="mt-8">
        <h2 className="font-display text-xl text-gold mb-3">Comentarios ({comments?.length ?? 0})</h2>
        <div className="space-y-3">
          {comments?.map((c: any) => (
            <div key={c.id} className="parchment rounded-lg p-4">
              <p className="text-sm text-foreground/90 whitespace-pre-line">{c.content}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  {c.profiles?.username ?? "Anónimo"} · {new Date(c.created_at).toLocaleString("es-ES")}
                </p>
                {user?.id === c.user_id && (
                  <button onClick={() => deleteComment.mutate(c.id)} className="text-xs text-destructive hover:underline">
                    eliminar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 parchment rounded-lg p-4">
          <Textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Escribe tu comentario…" />
          <div className="flex justify-end mt-2">
            <Button onClick={() => addComment.mutate()} className="bg-gradient-gold text-primary-foreground">
              <Send className="h-4 w-4 mr-2" /> Enviar
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}