import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/PageHeader";
import { useCurrentUser } from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/community/new")({
  component: NewPostPage,
  validateSearch: (s: Record<string, unknown>) => ({ category: (s.category as string) ?? "" }),
});

const schema = z.object({
  title: z.string().trim().min(3, "Mínimo 3 caracteres").max(150),
  content: z.string().trim().min(10, "Cuenta más, mi señor").max(5000),
  category_id: z.string().uuid("Elige una categoría"),
});

function NewPostPage() {
  const router = useRouter();
  const search = Route.useSearch();
  const { data: user } = useCurrentUser();
  const [loading, setLoading] = useState(false);

  const { data: cats } = useState<any[]>([])[0] ?? {} as any;
  // simple inline fetch
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  useEffect(() => {
    supabase.from("forum_categories").select("id,name,slug").order("sort_order").then(({ data }) => {
      setCategories(data ?? []);
    });
  }, []);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", content: "", category_id: "" },
  });

  useEffect(() => {
    if (search.category && categories.length) {
      const found = categories.find((c) => c.slug === search.category);
      if (found) form.setValue("category_id", found.id);
    }
  }, [search.category, categories, form]);

  const onSubmit = async (v: z.infer<typeof schema>) => {
    if (!user) return toast.error("Inicia sesión");
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .insert({ ...v, user_id: user.id })
      .select()
      .single();
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Pergamino publicado");
    router.navigate({ to: "/community/post/$id", params: { id: data.id } });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link to="/community" className="inline-flex items-center gap-2 text-gold/80 hover:text-gold mb-4 text-sm">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>
      <PageHeader title="Nuevo Pergamino" subtitle="Comparte tu crónica con la comunidad" />
      <form onSubmit={form.handleSubmit(onSubmit)} className="parchment rounded-lg p-6 space-y-4">
        <div>
          <Label>Categoría</Label>
          <Select value={form.watch("category_id")} onValueChange={(v) => form.setValue("category_id", v)}>
            <SelectTrigger><SelectValue placeholder="Elige una categoría" /></SelectTrigger>
            <SelectContent>
              {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          {form.formState.errors.category_id && <p className="text-xs text-destructive mt-1">{form.formState.errors.category_id.message}</p>}
        </div>
        <div>
          <Label>Título</Label>
          <Input {...form.register("title")} />
          {form.formState.errors.title && <p className="text-xs text-destructive mt-1">{form.formState.errors.title.message}</p>}
        </div>
        <div>
          <Label>Contenido</Label>
          <Textarea rows={8} {...form.register("content")} />
          {form.formState.errors.content && <p className="text-xs text-destructive mt-1">{form.formState.errors.content.message}</p>}
        </div>
        <Button type="submit" disabled={loading} className="bg-gradient-gold text-primary-foreground font-display w-full">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Publicar"}
        </Button>
      </form>
    </div>
  );
}