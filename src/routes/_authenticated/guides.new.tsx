import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/PageHeader";
import { useCurrentUser } from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/guides/new")({
  component: NewGuide,
});

const schema = z.object({
  title: z.string().trim().min(3).max(150),
  content: z.string().trim().min(20).max(10000),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
});

function NewGuide() {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", content: "", difficulty: "beginner" },
  });

  const onSubmit = async (v: z.infer<typeof schema>) => {
    if (!user) return toast.error("Inicia sesión");
    setLoading(true);
    const { data, error } = await supabase.from("guides").insert({ ...v, user_id: user.id }).select().single();
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Guía publicada");
    router.navigate({ to: "/guides/$id", params: { id: data.id } });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link to="/guides" className="inline-flex items-center gap-2 text-gold/80 hover:text-gold mb-4 text-sm">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>
      <PageHeader title="Nueva Guía" subtitle="Transmite tu sabiduría a la posteridad" />
      <form onSubmit={form.handleSubmit(onSubmit)} className="parchment rounded-lg p-6 space-y-4">
        <div>
          <Label>Título</Label>
          <Input {...form.register("title")} />
          {form.formState.errors.title && <p className="text-xs text-destructive mt-1">{form.formState.errors.title.message}</p>}
        </div>
        <div>
          <Label>Dificultad</Label>
          <Select value={form.watch("difficulty")} onValueChange={(v: any) => form.setValue("difficulty", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Principiante</SelectItem>
              <SelectItem value="intermediate">Intermedio</SelectItem>
              <SelectItem value="advanced">Avanzado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Contenido</Label>
          <Textarea rows={12} {...form.register("content")} />
          {form.formState.errors.content && <p className="text-xs text-destructive mt-1">{form.formState.errors.content.message}</p>}
        </div>
        <Button type="submit" disabled={loading} className="bg-gradient-gold text-primary-foreground font-display w-full">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Publicar Guía"}
        </Button>
      </form>
    </div>
  );
}