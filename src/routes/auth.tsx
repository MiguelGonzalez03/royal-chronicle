import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Crown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import heroMap from "@/assets/hero-map.jpg";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  ssr: false,
});

const loginSchema = z.object({
  email: z.string().trim().email("Correo no válido").max(255),
  password: z.string().min(6, "Mínimo 6 caracteres").max(72),
});
const signupSchema = loginSchema.extend({
  username: z.string().trim().min(2, "Mínimo 2 caracteres").max(30, "Máximo 30 caracteres"),
});

function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.navigate({ to: "/" });
    });
  }, [router]);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", username: "" },
  });

  const onLogin = async (v: z.infer<typeof loginSchema>) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword(v);
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Bienvenido, mi señor");
    router.navigate({ to: "/" });
  };

  const onSignup = async (v: z.infer<typeof signupSchema>) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: v.email,
      password: v.password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { username: v.username },
      },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Cuenta creada. Ya puedes iniciar sesión.");
  };

  const onForgot = async () => {
    const email = loginForm.getValues("email");
    if (!email) return toast.error("Introduce tu correo primero");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) return toast.error(error.message);
    toast.success("Te hemos enviado un correo de recuperación");
    setForgot(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <div className="absolute inset-0 -z-10">
        <img src={heroMap} alt="" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-royal opacity-90" />
      </div>

      <div className="w-full max-w-md parchment rounded-lg p-8 shadow-royal">
        <div className="text-center mb-6">
          <Crown className="h-12 w-12 text-gold mx-auto mb-2" />
          <h1 className="font-display text-3xl text-gold tracking-widest">REINO</h1>
          <p className="text-sm text-muted-foreground mt-1 italic">Crusader Kings III Community</p>
          <div className="divider-ornate mt-4" />
        </div>

        {forgot ? (
          <div className="space-y-4">
            <h2 className="font-display text-xl text-gold text-center">Recuperar Contraseña</h2>
            <Label>Correo electrónico</Label>
            <Input
              type="email"
              placeholder="tu@correo.com"
              value={loginForm.watch("email")}
              onChange={(e) => loginForm.setValue("email", e.target.value)}
            />
            <Button onClick={onForgot} className="w-full bg-gradient-gold text-primary-foreground">
              Enviar correo de recuperación
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setForgot(false)}>
              Volver
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="login">
            <TabsList className="grid grid-cols-2 w-full bg-secondary/40">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="signup">Registrarse</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4 pt-4">
                <div>
                  <Label>Correo</Label>
                  <Input type="email" {...loginForm.register("email")} />
                  {loginForm.formState.errors.email && (
                    <p className="text-xs text-destructive mt-1">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label>Contraseña</Label>
                  <Input type="password" {...loginForm.register("password")} />
                  {loginForm.formState.errors.password && (
                    <p className="text-xs text-destructive mt-1">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-gradient-gold text-primary-foreground font-display tracking-wider shadow-gold-glow">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Iniciar Sesión"}
                </Button>
                <button
                  type="button"
                  onClick={() => setForgot(true)}
                  className="w-full text-xs text-gold/80 hover:text-gold underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4 pt-4">
                <div>
                  <Label>Nombre de usuario</Label>
                  <Input {...signupForm.register("username")} />
                  {signupForm.formState.errors.username && (
                    <p className="text-xs text-destructive mt-1">{signupForm.formState.errors.username.message}</p>
                  )}
                </div>
                <div>
                  <Label>Correo</Label>
                  <Input type="email" {...signupForm.register("email")} />
                  {signupForm.formState.errors.email && (
                    <p className="text-xs text-destructive mt-1">{signupForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label>Contraseña</Label>
                  <Input type="password" {...signupForm.register("password")} />
                  {signupForm.formState.errors.password && (
                    <p className="text-xs text-destructive mt-1">{signupForm.formState.errors.password.message}</p>
                  )}
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-gradient-gold text-primary-foreground font-display tracking-wider shadow-gold-glow">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Forjar Cuenta"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}