import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client--JyBqMqn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as Image, r as Root, t as Fallback } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { E as BookOpen, d as Scroll, i as Trophy, v as LoaderCircle, x as Crown } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { n as Label, t as Input } from "./label-B7oQAA24.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PageHeader } from "./PageHeader-CFJ1JsvX.mjs";
import { t as useCurrentUser } from "./queries-J5rxyFkP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-CwXZg2yN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Avatar = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
	...props
}));
Avatar.displayName = Root.displayName;
var AvatarImage = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
	ref,
	className: cn("aspect-square h-full w-full", className),
	...props
}));
AvatarImage.displayName = Image.displayName;
var AvatarFallback = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fallback, {
	ref,
	className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
	...props
}));
AvatarFallback.displayName = Fallback.displayName;
function ProfilePage() {
	const { data: user } = useCurrentUser();
	const qc = useQueryClient();
	const { data: profile } = useQuery({
		queryKey: ["profile", user?.id],
		enabled: !!user,
		queryFn: async () => {
			const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
			return data;
		}
	});
	const { data: stats } = useQuery({
		queryKey: ["profile-stats", user?.id],
		enabled: !!user,
		queryFn: async () => {
			const [posts, guides, likes] = await Promise.all([
				supabase.from("posts").select("id", {
					count: "exact",
					head: true
				}).eq("user_id", user.id),
				supabase.from("guides").select("id", {
					count: "exact",
					head: true
				}).eq("user_id", user.id),
				supabase.from("likes").select("id", {
					count: "exact",
					head: true
				}).eq("user_id", user.id)
			]);
			return {
				posts: posts.count ?? 0,
				guides: guides.count ?? 0,
				likes: likes.count ?? 0
			};
		}
	});
	const [username, setUsername] = (0, import_react.useState)("");
	const [avatarUrl, setAvatarUrl] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
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
				avatar_url: avatarUrl.trim() || null
			}).eq("id", user.id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Perfil actualizado");
			qc.invalidateQueries({ queryKey: ["profile"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const achievements = [
		{
			label: "Primer Pergamino",
			got: (stats?.posts ?? 0) >= 1
		},
		{
			label: "Cronista (5 publicaciones)",
			got: (stats?.posts ?? 0) >= 5
		},
		{
			label: "Maestro Escriba (guía publicada)",
			got: (stats?.guides ?? 0) >= 1
		},
		{
			label: "Generoso (10 me gusta)",
			got: (stats?.likes ?? 0) >= 10
		}
	];
	if (!user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-4xl mx-auto px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Tu Estandarte",
			subtitle: "Gestiona tu identidad en el reino"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid md:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "parchment rounded-lg p-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						className: "h-24 w-24 mx-auto border-2 border-[color:var(--gold)]/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: profile?.avatar_url ?? void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
							className: "bg-gradient-gold text-primary-foreground font-display text-2xl",
							children: (profile?.username ?? "?").slice(0, 1).toUpperCase()
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-gold mt-3",
						children: profile?.username
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: user.email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground mt-2",
						children: ["Miembro desde ", profile && new Date(profile.created_at).toLocaleDateString("es-ES")]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-2 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "parchment rounded-lg p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg text-gold mb-3",
							children: "Editar Perfil"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nombre de usuario" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: username,
									onChange: (e) => setUsername(e.target.value)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "URL del avatar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: avatarUrl,
									onChange: (e) => setAvatarUrl(e.target.value),
									placeholder: "https://…"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => save.mutate(),
									disabled: save.isPending,
									className: "bg-gradient-gold text-primary-foreground",
									children: save.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Guardar"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scroll, { className: "h-5 w-5" }),
								label: "Publicaciones",
								value: stats?.posts ?? 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-5 w-5" }),
								label: "Guías",
								value: stats?.guides ?? 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-5 w-5" }),
								label: "Me gusta dados",
								value: stats?.likes ?? 0
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "parchment rounded-lg p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-display text-lg text-gold mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-5 w-5" }), " Logros"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid sm:grid-cols-2 gap-2",
							children: achievements.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `p-3 rounded border ${a.got ? "border-gold/60 bg-gold/10" : "border-border bg-secondary/30 opacity-60"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: `text-sm ${a.got ? "text-gold" : "text-muted-foreground"}`,
									children: [a.got ? "✦ " : "✧ ", a.label]
								})
							}, a.label))
						})]
					})
				]
			})]
		})]
	});
}
function Stat({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "parchment rounded-lg p-4 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-gold inline-flex",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl text-gold mt-1",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: label
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
