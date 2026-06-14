import { t as supabase } from "./client-BDk6QgZS.mjs";
import { u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { f as Plus, h as MessageSquare } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { t as PageHeader } from "./PageHeader-CFJ1JsvX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community.index-DWdzQRev.js
var import_jsx_runtime = require_jsx_runtime();
function CommunityIndex() {
	const { data: cats } = useQuery({
		queryKey: ["forum-categories"],
		queryFn: async () => {
			const { data } = await supabase.from("forum_categories").select("*").order("sort_order");
			return data ?? [];
		}
	});
	const { data: recent } = useQuery({
		queryKey: ["forum-recent"],
		queryFn: async () => {
			const { data } = await supabase.from("posts").select("id, title, created_at, profiles:profiles!posts_user_id_fkey(username)").order("created_at", { ascending: false }).limit(5);
			return data ?? [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-7xl mx-auto px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "El Salón del Trono",
			subtitle: "Reúnete con la comunidad y comparte tus crónicas",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/community/new",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "bg-gradient-gold text-primary-foreground font-display",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-2" }), " Nuevo Pergamino"]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2 grid sm:grid-cols-2 gap-4",
				children: cats?.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/community/$category",
					params: { category: c.slug },
					className: "parchment rounded-lg p-5 hover:shadow-gold-glow transition",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-5 w-5 text-gold mt-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg text-gold",
							children: c.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-1",
							children: c.description
						})] })]
					})
				}, c.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "parchment rounded-lg p-5 h-fit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg text-gold mb-3",
						children: "Pergaminos Recientes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-ornate mb-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-3",
						children: [recent?.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/community/post/$id",
							params: { id: p.id },
							className: "block hover:text-gold transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium line-clamp-1",
								children: p.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"por ",
									p.profiles?.username ?? "Anónimo",
									" · ",
									new Date(p.created_at).toLocaleDateString("es-ES")
								]
							})]
						}) }, p.id)), !recent?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground italic",
							children: "Aún no hay publicaciones."
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
export { CommunityIndex as component };
