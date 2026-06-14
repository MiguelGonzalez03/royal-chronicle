import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/dlcs")({
  component: DlcsPage,
});

function DlcsPage() {
  const { data } = useQuery({
    queryKey: ["dlcs"],
    queryFn: async () => {
      const { data } = await supabase
        .from("dlcs")
        .select("*")
        .order("release_date", { ascending: false, nullsFirst: false });
      return data ?? [];
    },
  });

  const released = data?.filter((d) => d.status === "released") ?? [];
  const upcoming = data?.filter((d) => d.status === "upcoming") ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <PageHeader title="Expansiones del Reino" subtitle="Todos los DLCs lanzados y los que están por venir" />
      <Tabs defaultValue="released">
        <TabsList className="bg-secondary/40 mb-6">
          <TabsTrigger value="released">Disponibles ({released.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Próximos ({upcoming.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="released" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {released.map((d) => <DlcCard key={d.id} dlc={d} />)}
        </TabsContent>
        <TabsContent value="upcoming" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcoming.map((d) => <DlcCard key={d.id} dlc={d} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DlcCard({ dlc }: { dlc: any }) {
  return (
    <div className="parchment rounded-lg overflow-hidden">
      {dlc.image_url && (
        <div className="aspect-video overflow-hidden relative">
          <img src={dlc.image_url} alt={dlc.name} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute top-2 right-2">
            {dlc.status === "upcoming" ? (
              <Badge className="bg-[color:var(--burgundy)] text-foreground border-gold/40">Próximamente</Badge>
            ) : (
              <Badge className="bg-gradient-gold text-primary-foreground">Disponible</Badge>
            )}
          </div>
        </div>
      )}
      <div className="p-5">
        <h3 className="font-display text-xl text-gold">{dlc.name}</h3>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {dlc.status === "released"
            ? dlc.release_date && new Date(dlc.release_date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
            : dlc.estimated_release}
        </p>
        <p className="text-sm text-foreground/85 mt-3">{dlc.description}</p>
        {dlc.features && (
          <div className="mt-3 pt-3 border-t border-gold/20">
            <p className="text-xs text-gold/80 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Sparkles className="h-3 w-3" /> Características
            </p>
            <p className="text-sm text-muted-foreground">{dlc.features}</p>
          </div>
        )}
      </div>
    </div>
  );
}