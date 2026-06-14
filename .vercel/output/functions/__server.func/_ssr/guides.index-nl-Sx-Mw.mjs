import { t as supabase } from "./client-BDk6QgZS.mjs";
import { u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { E as BookOpen, f as Plus } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { t as PageHeader } from "./PageHeader-CFJ1JsvX.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guides.index-nl-Sx-Mw.js
var import_jsx_runtime = require_jsx_runtime();
var LABEL = {
	beginner: "Principiante",
	intermediate: "Intermedio",
	advanced: "Avanzado"
};
function GuidesList() {
	const { data } = useQuery({
		queryKey: ["guides"],
		queryFn: async () => {
			const { data } = await supabase.from("guides").select("id, title, content, difficulty, created_at, profiles:profiles!guides_user_id_fkey(username)").order("created_at", { ascending: false });
			return data ?? [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-7xl mx-auto px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Códices y Guías",
			subtitle: "Sabiduría compilada por la comunidad",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/guides/new",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "bg-gradient-gold text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-2" }), "Escribir guía"]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5",
			children: [data?.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/guides/$id",
				params: { id: g.id },
				className: "parchment rounded-lg p-5 hover:shadow-gold-glow transition",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-5 w-5 text-gold mt-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg text-gold line-clamp-2",
								children: g.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mt-2 line-clamp-3",
								children: g.content
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "bg-gradient-gold text-primary-foreground",
									children: LABEL[g.difficulty]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: ["por ", g.profiles?.username ?? "Anónimo"]
								})]
							})
						]
					})]
				})
			}, g.id)), !data?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground italic col-span-full",
				children: "Aún no hay guías. ¡Escribe la primera!"
			})]
		})]
	});
}
//#endregion
export { GuidesList as component };
