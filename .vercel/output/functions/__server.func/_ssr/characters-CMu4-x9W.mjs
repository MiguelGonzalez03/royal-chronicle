import { t as supabase } from "./client-BDk6QgZS.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { l as Shield, s as Star, y as Lightbulb } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-CFJ1JsvX.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/characters-CMu4-x9W.js
var import_jsx_runtime = require_jsx_runtime();
var DIFF_LABEL = {
	beginner: "Principiante",
	intermediate: "Intermedio",
	advanced: "Avanzado"
};
function CharactersPage() {
	const { data } = useQuery({
		queryKey: ["characters"],
		queryFn: async () => {
			const { data } = await supabase.from("recommended_characters").select("*");
			return data ?? [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-7xl mx-auto px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Casas Notables",
			subtitle: "Personajes recomendados para empezar tu legado"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid md:grid-cols-2 gap-6",
			children: data?.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "parchment rounded-lg overflow-hidden",
				children: [c.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: c.image_url,
					alt: c.name,
					className: "w-full aspect-[16/7] object-cover",
					loading: "lazy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl text-gold",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground flex items-center gap-1 mt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3 w-3 text-gold" }),
									" ",
									c.realm
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "bg-gradient-gold text-primary-foreground",
								children: DIFF_LABEL[c.difficulty]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-foreground/90 mt-3",
							children: c.description
						}),
						c.advantages && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs uppercase tracking-wider text-gold/80 flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3" }), " Ventajas"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: c.advantages
							})]
						}),
						c.tips && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs uppercase tracking-wider text-gold/80 flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "h-3 w-3" }), " Consejos"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: c.tips
							})]
						})
					]
				})]
			}, c.id))
		})]
	});
}
//#endregion
export { CharactersPage as component };
