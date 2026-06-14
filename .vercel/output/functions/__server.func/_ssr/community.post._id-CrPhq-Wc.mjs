import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client--JyBqMqn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useRouter, u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { O as ArrowLeft, a as Trash2, b as Heart, u as Send } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { t as useCurrentUser } from "./queries-J5rxyFkP.mjs";
import { t as Route } from "./community.post._id-QVw4vFs9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community.post._id-CrPhq-Wc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PostDetail() {
	const { id } = Route.useParams();
	const router = useRouter();
	const qc = useQueryClient();
	const { data: user } = useCurrentUser();
	const [comment, setComment] = (0, import_react.useState)("");
	const { data: post } = useQuery({
		queryKey: ["post", id],
		queryFn: async () => {
			const { data } = await supabase.from("posts").select("*, profiles:profiles!posts_user_id_fkey(username, avatar_url)").eq("id", id).maybeSingle();
			return data;
		}
	});
	const { data: comments } = useQuery({
		queryKey: ["comments", id],
		queryFn: async () => {
			const { data } = await supabase.from("comments").select("*, profiles:profiles!comments_user_id_fkey(username)").eq("post_id", id).order("created_at");
			return data ?? [];
		}
	});
	const { data: likes } = useQuery({
		queryKey: ["likes", id],
		queryFn: async () => {
			const { data } = await supabase.from("likes").select("user_id").eq("post_id", id);
			return data ?? [];
		}
	});
	const hasLiked = !!user && likes?.some((l) => l.user_id === user.id);
	const toggleLike = useMutation({
		mutationFn: async () => {
			if (!user) throw new Error("Inicia sesión");
			if (hasLiked) await supabase.from("likes").delete().eq("post_id", id).eq("user_id", user.id);
			else await supabase.from("likes").insert({
				post_id: id,
				user_id: user.id
			});
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["likes", id] })
	});
	const addComment = useMutation({
		mutationFn: async () => {
			if (!user) throw new Error("Inicia sesión");
			if (comment.trim().length < 1) throw new Error("Vacío");
			const { error } = await supabase.from("comments").insert({
				post_id: id,
				user_id: user.id,
				content: comment.trim()
			});
			if (error) throw error;
		},
		onSuccess: () => {
			setComment("");
			qc.invalidateQueries({ queryKey: ["comments", id] });
		},
		onError: (e) => toast.error(e.message)
	});
	const deletePost = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("posts").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Pergamino eliminado");
			router.navigate({ to: "/community" });
		}
	});
	const deleteComment = useMutation({
		mutationFn: async (cid) => {
			const { error } = await supabase.from("comments").delete().eq("id", cid);
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["comments", id] })
	});
	if (!post) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-3xl mx-auto px-4 py-16 text-muted-foreground",
		children: "Cargando…"
	});
	const isOwner = user?.id === post.user_id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl mx-auto px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/community",
				className: "inline-flex items-center gap-2 text-gold/80 hover:text-gold mb-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Volver al foro"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "parchment rounded-lg p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl text-gold",
						children: post.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: [
							"por ",
							post.profiles?.username ?? "Anónimo",
							" · ",
							new Date(post.created_at).toLocaleString("es-ES")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-ornate my-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-foreground/90 whitespace-pre-line leading-relaxed",
						children: post.content
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => toggleLike.mutate(),
							className: `border-gold/40 ${hasLiked ? "text-accent bg-accent/10" : "text-gold"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-4 w-4 mr-1 ${hasLiked ? "fill-accent" : ""}` }),
								" ",
								likes?.length ?? 0
							]
						}), isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => deletePost.mutate(),
							className: "text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 mr-1" }), " Eliminar"]
						})]
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
							comments?.length ?? 0,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: comments?.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "parchment rounded-lg p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-foreground/90 whitespace-pre-line",
								children: c.content
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										c.profiles?.username ?? "Anónimo",
										" · ",
										new Date(c.created_at).toLocaleString("es-ES")
									]
								}), user?.id === c.user_id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => deleteComment.mutate(c.id),
									className: "text-xs text-destructive hover:underline",
									children: "eliminar"
								})]
							})]
						}, c.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 parchment rounded-lg p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 3,
							value: comment,
							onChange: (e) => setComment(e.target.value),
							placeholder: "Escribe tu comentario…"
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
export { PostDetail as component };
