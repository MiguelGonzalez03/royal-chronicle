import { t as supabase } from "./client--JyBqMqn.mjs";
import { u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { O as ArrowLeft, f as Plus } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { t as PageHeader } from "./PageHeader-CFJ1JsvX.mjs";
import { t as Route } from "./community._category-6xi9EZOf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community._category-DhGb8e2A.js
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const { category } = Route.useParams();
	const { data: cat } = useQuery({
		queryKey: ["forum-cat", category],
		queryFn: async () => {
			const { data } = await supabase.from("forum_categories").select("*").eq("slug", category).maybeSingle();
			return data;
		}
	});
	const { data: posts } = useQuery({
		queryKey: ["posts-by-cat", cat?.id],
		enabled: !!cat?.id,
		queryFn: async () => {
			const { data } = await supabase.from("posts").select("id, title, content, created_at, profiles:profiles!posts_user_id_fkey(username, avatar_url)").eq("category_id", cat.id).order("created_at", { ascending: false });
			return data ?? [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-5xl mx-auto px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/community",
				className: "inline-flex items-center gap-2 text-gold/80 hover:text-gold mb-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Volver al foro"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: cat?.name ?? "Categoría",
				subtitle: cat?.description ?? void 0,
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/community/new",
					search: { category },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "bg-gradient-gold text-primary-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-2" }), "Publicar"]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [posts?.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/community/post/$id",
					params: { id: p.id },
					className: "block parchment rounded-lg p-5 hover:shadow-gold-glow transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg text-gold",
							children: p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-1 line-clamp-2",
							children: p.content
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground mt-2",
							children: [
								"por ",
								p.profiles?.username ?? "Anónimo",
								" · ",
								new Date(p.created_at).toLocaleDateString("es-ES")
							]
						})
					]
				}, p.id)), !posts?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground italic",
					children: "Aún no hay pergaminos en esta categoría. ¡Sé el primero!"
				})]
			})
		]
	});
}
//#endregion
export { CategoryPage as component };
