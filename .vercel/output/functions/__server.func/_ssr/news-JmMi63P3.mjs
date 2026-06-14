import { t as supabase } from "./client--JyBqMqn.mjs";
import { u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { t as PageHeader } from "./PageHeader-CFJ1JsvX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news-JmMi63P3.js
var import_jsx_runtime = require_jsx_runtime();
function NewsPage() {
	const { data } = useQuery({
		queryKey: ["news"],
		queryFn: async () => {
			const { data } = await supabase.from("news").select("*").order("published_at", { ascending: false });
			return data ?? [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-7xl mx-auto px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Crónicas del Reino",
			subtitle: "Pergaminos con las últimas nuevas de Crusader Kings III"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
			children: data?.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "parchment rounded-lg overflow-hidden flex flex-col",
				children: [n.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-video overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: n.image_url,
						alt: n.title,
						className: "w-full h-full object-cover",
						loading: "lazy"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 flex-1 flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-gold/70 uppercase tracking-wider",
							children: new Date(n.published_at).toLocaleDateString("es-ES", {
								day: "numeric",
								month: "long",
								year: "numeric"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl text-gold mt-1 line-clamp-2",
							children: n.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-2 line-clamp-3 flex-1",
							children: n.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/news/$id",
							params: { id: n.id },
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "border-gold/40 text-gold hover:bg-gold/10 w-full",
								children: "Leer más"
							})
						})
					]
				})]
			}, n.id))
		})]
	});
}
//#endregion
export { NewsPage as component };
