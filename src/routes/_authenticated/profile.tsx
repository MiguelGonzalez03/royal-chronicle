import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Crown, Trophy, Scroll, BookOpen, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/PageHeader";
import { useCurrentUser } from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { data: user } = useCurrentUser();
  const qc = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user!.id).maybeSingle();
      return data;
    },
  });

  const { data: stats } = useQuery({
    queryKey: ["profile-stats", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const [posts, guides, likes] = await Promise.all([
        supabase.from("posts").select("id", { count: "exact", head: true }).eq("user_id", user!.id),
        supabase.from("guides").select("id", { count: "exact", head: true }).eq("user_id", user!.id),
        supabase.from("likes").select("id", { count: "exact", head: true }).eq("user_id", user!.id),
      ]);
      return { posts: posts.count ?? 0, guides: guides.count ?? 0, likes: likes.count ?? 0 };
    },
  });

  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    if (profile) {
      setUsername(profile.username ?? "");
      setAvatarUrl(profile.avatar_url ?? "");
    }
  }, [profile]);

  const save = useMutation({
    mutationFn: async () => {
      if (!user) return;
      const { error } = await supabase.from("profiles").update({
        username: username.trim(),
        avatar_url: avatarUrl.trim() || null,
      }).eq("id", user.id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Perfil actualizado"); qc.invalidateQueries({ queryKey: ["profile"] }); },
    onError: (e: Error) => toast.error(e.message),
  });

  const achievements: { label: string; got: boolean }[] = [
    { label: "Primer Pergamino", got: (stats?.posts ?? 0) >= 1 },
    { label: "Cronista (5 publicaciones)", got: (stats?.posts ?? 0) >= 5 },
    { label: "Maestro Escriba (guía publicada)", got: (stats?.guides ?? 0) >= 1 },
    { label: "Generoso (10 me gusta)", got: (stats?.likes ?? 0) >= 10 },
  ];

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <PageHeader title="Tu Estandarte" subtitle="Gestiona tu identidad en el reino" />
      <div className="grid md:grid-cols-3 gap-6">
        <div className="parchment rounded-lg p-6 text-center">
          <Avatar className="h-24 w-24 mx-auto border-2 border-[color:var(--gold)]/60">
            <AvatarImage src={profile?.avatar_url ?? undefined} />
            <AvatarFallback className="bg-gradient-gold text-primary-foreground font-display text-2xl">
              {(profile?.username ?? "?").slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h2 className="font-display text-2xl text-gold mt-3">{profile?.username}</h2>
          <p className="text-xs text-muted-foreground">{user.email}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Miembro desde {profile && new Date(profile.created_at).toLocaleDateString("es-ES")}
          </p>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="parchment rounded-lg p-5">
            <h3 className="font-display text-lg text-gold mb-3">Editar Perfil</h3>
            <div className="space-y-3">
              <div>
                <Label>Nombre de usuario</Label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div>
                <Label>URL del avatar</Label>
                <Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://…" />
              </div>
              <Button onClick={() => save.mutate()} disabled={save.isPending} className="bg-gradient-gold text-primary-foreground">
                {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Stat icon={<Scroll className="h-5 w-5" />} label="Publicaciones" value={stats?.posts ?? 0} />
            <Stat icon={<BookOpen className="h-5 w-5" />} label="Guías" value={stats?.guides ?? 0} />
            <Stat icon={<Crown className="h-5 w-5" />} label="Me gusta dados" value={stats?.likes ?? 0} />
          </div>

          <div className="parchment rounded-lg p-5">
            <h3 className="font-display text-lg text-gold mb-3 flex items-center gap-2"><Trophy className="h-5 w-5" /> Logros</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {achievements.map((a) => (
                <div key={a.label} className={`p-3 rounded border ${a.got ? "border-gold/60 bg-gold/10" : "border-border bg-secondary/30 opacity-60"}`}>
                  <p className={`text-sm ${a.got ? "text-gold" : "text-muted-foreground"}`}>{a.got ? "✦ " : "✧ "}{a.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="parchment rounded-lg p-4 text-center">
      <div className="text-gold inline-flex">{icon}</div>
      <p className="font-display text-2xl text-gold mt-1">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}