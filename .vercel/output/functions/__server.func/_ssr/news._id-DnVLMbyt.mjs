import { t as supabase } from "./client--JyBqMqn.mjs";
import { u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { O as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as Route } from "./news._id-DCgMAv64.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news._id-DnVLMbyt.js
var import_jsx_runtime = require_jsx_runtime();
function NewsDetail() {
	const { id } = Route.useParams();
	const { data, isLoading } = useQuery({
		queryKey: ["news", id],
		queryFn: async () => {
			const { data } = await supabase.from("news").select("*").eq("id", id).maybeSingle();
			return data;
		}
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-3xl mx-auto px-4 py-16 text-muted-foreground",
		children: "Cargando pergamino…"
	});
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-3xl mx-auto px-4 py-16",
		children: "Noticia no encontrada."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "max-w-3xl mx-auto px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/news",
				className: "inline-flex items-center gap-2 text-gold/80 hover:text-gold mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Volver a noticias"]
			}),
			data.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: data.image_url,
				alt: data.title,
				className: "w-full aspect-video object-cover rounded-lg parchment"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-gold/70 uppercase tracking-wider mt-6",
				children: new Date(data.published_at).toLocaleDateString("es-ES", {
					day: "numeric",
					month: "long",
					year: "numeric"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl text-gold mt-2",
				children: data.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-ornate my-6" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg text-foreground/90 italic",
				children: data.summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 text-foreground/90 leading-relaxed whitespace-pre-line",
				children: data.content
			})
		]
	});
}
//#endregion
export { NewsDetail as component };
