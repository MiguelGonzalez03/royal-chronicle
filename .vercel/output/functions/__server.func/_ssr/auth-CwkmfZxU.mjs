import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client--JyBqMqn.mjs";
import { t as hero_map_default } from "./hero-map-SZolpayk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { v as LoaderCircle, x as Crown } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { n as Label, t as Input } from "./label-B7oQAA24.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useForm, t as a } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CwkmfZxU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var loginSchema = objectType({
	email: stringType().trim().email("Correo no válido").max(255),
	password: stringType().min(6, "Mínimo 6 caracteres").max(72)
});
var signupSchema = loginSchema.extend({ username: stringType().trim().min(2, "Mínimo 2 caracteres").max(30, "Máximo 30 caracteres") });
function AuthPage() {
	const router = useRouter();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [forgot, setForgot] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) router.navigate({ to: "/" });
		});
	}, [router]);
	const loginForm = useForm({
		resolver: a(loginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});
	const signupForm = useForm({
		resolver: a(signupSchema),
		defaultValues: {
			email: "",
			password: "",
			username: ""
		}
	});
	const onLogin = async (v) => {
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword(v);
		setLoading(false);
		if (error) return toast.error(error.message);
		toast.success("Bienvenido, mi señor");
		router.navigate({ to: "/" });
	};
	const onSignup = async (v) => {
		setLoading(true);
		const { error } = await supabase.auth.signUp({
			email: v.email,
			password: v.password,
			options: {
				emailRedirectTo: window.location.origin,
				data: { username: v.username }
			}
		});
		setLoading(false);
		if (error) return toast.error(error.message);
		toast.success("Cuenta creada. Ya puedes iniciar sesión.");
	};
	const onForgot = async () => {
		const email = loginForm.getValues("email");
		if (!email) return toast.error("Introduce tu correo primero");
		const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
		if (error) return toast.error(error.message);
		toast.success("Te hemos enviado un correo de recuperación");
		setForgot(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen relative flex items-center justify-center p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 -z-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: hero_map_default,
				alt: "",
				className: "h-full w-full object-cover opacity-30"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-royal opacity-90" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md parchment rounded-lg p-8 shadow-royal",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-12 w-12 text-gold mx-auto mb-2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl text-gold tracking-widest",
						children: "REINO"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-1 italic",
						children: "Crusader Kings III Community"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-ornate mt-4" })
				]
			}), forgot ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-gold text-center",
						children: "Recuperar Contraseña"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Correo electrónico" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "email",
						placeholder: "tu@correo.com",
						value: loginForm.watch("email"),
						onChange: (e) => loginForm.setValue("email", e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: onForgot,
						className: "w-full bg-gradient-gold text-primary-foreground",
						children: "Enviar correo de recuperación"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "w-full",
						onClick: () => setForgot(false),
						children: "Volver"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "login",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "grid grid-cols-2 w-full bg-secondary/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "login",
							children: "Iniciar Sesión"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "signup",
							children: "Registrarse"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "login",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: loginForm.handleSubmit(onLogin),
							className: "space-y-4 pt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Correo" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "email",
										...loginForm.register("email")
									}),
									loginForm.formState.errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-destructive mt-1",
										children: loginForm.formState.errors.email.message
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Contraseña" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "password",
										...loginForm.register("password")
									}),
									loginForm.formState.errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-destructive mt-1",
										children: loginForm.formState.errors.password.message
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: loading,
									className: "w-full bg-gradient-gold text-primary-foreground font-display tracking-wider shadow-gold-glow",
									children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Iniciar Sesión"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setForgot(true),
									className: "w-full text-xs text-gold/80 hover:text-gold underline",
									children: "¿Olvidaste tu contraseña?"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "signup",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: signupForm.handleSubmit(onSignup),
							className: "space-y-4 pt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nombre de usuario" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...signupForm.register("username") }),
									signupForm.formState.errors.username && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-destructive mt-1",
										children: signupForm.formState.errors.username.message
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Correo" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "email",
										...signupForm.register("email")
									}),
									signupForm.formState.errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-destructive mt-1",
										children: signupForm.formState.errors.email.message
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Contraseña" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "password",
										...signupForm.register("password")
									}),
									signupForm.formState.errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-destructive mt-1",
										children: signupForm.formState.errors.password.message
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: loading,
									className: "w-full bg-gradient-gold text-primary-foreground font-display tracking-wider shadow-gold-glow",
									children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Forjar Cuenta"
								})
							]
						})
					})
				]
			})]
		})]
	});
}
//#endregion
export { AuthPage as component };
