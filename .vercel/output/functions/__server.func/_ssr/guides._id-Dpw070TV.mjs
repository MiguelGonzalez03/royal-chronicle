import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client--JyBqMqn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useRouter, u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { O as ArrowLeft, a as Trash2, s as Star, u as Send } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { t as useCurrentUser } from "./queries-J5rxyFkP.mjs";
import { t as Route } from "./guides._id-DGyznZWP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guides._id-Dpw070TV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LABEL = {
	beginner: "Principiante",
	intermediate: "Intermedio",
	advanced: "Avanzado"
};
function GuideDetail() {
	const { id } = Route.useParams();
	const router = useRouter();
	const qc = useQueryClient();
	const { data: user } = useCurrentUser();
	const [comment, setComment] = (0, import_react.useState)("");
	const { data: guide } = useQuery({
		queryKey: ["guide", id],
		queryFn: async () => {
			const { data } = await supabase.from("guides").select("*, profiles:profiles!guides_user_id_fkey(username)").eq("id", id).maybeSingle();
			return data;
		}
	});
	const { data: ratings } = useQuery({
		queryKey: ["ratings", id],
		queryFn: async () => (await supabase.from("guide_ratings").select("rating,user_id").eq("guide_id", id)).data ?? []
	});
	const { data: gcomments } = useQuery({
		queryKey: ["gcomments", id],
		queryFn: async () => (await supabase.from("guide_comments").select("*, profiles:profiles!guide_comments_user_id_fkey(username)").eq("guide_id", id).order("created_at")).data ?? []
	});
	const avg = ratings?.length ? ratings.reduce((a, r) => a + r.rating, 0) / ratings.length : 0;
	const myRating = user ? ratings?.find((r) => r.user_id === user.id)?.rating : void 0;
	const rate = useMutation({
		mutationFn: async (rating) => {
			if (!user) throw new Error("Inicia sesión");
			await supabase.from("guide_ratings").upsert({
				guide_id: id,
				user_id: user.id,
				rating
			}, { onConflict: "guide_id,user_id" });
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["ratings", id] })
	});
	const addComment = useMutation({
		mutationFn: async () => {
			if (!user) throw new Error("Inicia sesión");
			if (!comment.trim()) throw new Error("Vacío");
			const { error } = await supabase.from("guide_comments").insert({
				guide_id: id,
				user_id: user.id,
				content: comment.trim()
			});
			if (error) throw error;
		},
		onSuccess: () => {
			setComment("");
			qc.invalidateQueries({ queryKey: ["gcomments", id] });
		},
		onError: (e) => toast.error(e.message)
	});
	const delGuide = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("guides").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Guía eliminada");
			router.navigate({ to: "/guides" });
		}
	});
	if (!guide) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-3xl mx-auto px-4 py-16 text-muted-foreground",
		children: "Cargando…"
	});
	const isOwner = user?.id === guide.user_id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl mx-auto px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/guides",
				className: "inline-flex items-center gap-2 text-gold/80 hover:text-gold mb-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Volver a guías"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "parchment rounded-lg p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl text-gold",
							children: guide.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "bg-gradient-gold text-primary-foreground",
							children: LABEL[guide.difficulty]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: [
							"por ",
							guide.profiles?.username ?? "Anónimo",
							" · ",
							new Date(guide.created_at).toLocaleDateString("es-ES")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-ornate my-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-foreground/90 whitespace-pre-line leading-relaxed",
						children: guide.content
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center gap-3 flex-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1",
								children: [
									1,
									2,
									3,
									4,
									5
								].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => rate.mutate(n),
									className: "hover:scale-110 transition",
									"aria-label": `Valorar ${n}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-5 w-5 ${(myRating ?? 0) >= n ? "fill-gold text-gold" : "text-muted-foreground"}` })
								}, n))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm text-muted-foreground",
								children: [
									avg.toFixed(1),
									" / 5 (",
									ratings?.length ?? 0,
									" valoraciones)"
								]
							}),
							isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => delGuide.mutate(),
								className: "text-destructive ml-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 mr-1" }), " Eliminar"]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-xl text-gold mb-3",
						children: [
							"Comentarios (",
							gcomments?.length ?? 0,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: gcomments?.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "parchment rounded-lg p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-foreground/90 whitespace-pre-line",
								children: c.content
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground mt-2",
								children: [
									c.profiles?.username ?? "Anónimo",
									" · ",
									new Date(c.created_at).toLocaleString("es-ES")
								]
							})]
						}, c.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 parchment rounded-lg p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 3,
							value: comment,
							onChange: (e) => setComment(e.target.value),
							placeholder: "Comparte tu opinión…"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => addComment.mutate(),
								className: "bg-gradient-gold text-primary-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4 mr-2" }), " Enviar"]
							})
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { GuideDetail as component };
