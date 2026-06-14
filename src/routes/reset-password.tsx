import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Crown, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("Mínimo 6 caracteres");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Contraseña actualizada");
    router.navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-royal">
      <form onSubmit={onSubmit} className="w-full max-w-md parchment rounded-lg p-8 shadow-royal space-y-4">
        <div className="text-center">
          <Crown className="h-10 w-10 text-gold mx-auto mb-2" />
          <h1 className="font-display text-2xl text-gold">Nueva Contraseña</h1>
        </div>
        <div>
          <Label>Contraseña nueva</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" disabled={loading} className="w-full bg-gradient-gold text-primary-foreground font-display">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar"}
        </Button>
      </form>
    </div>
  );
}