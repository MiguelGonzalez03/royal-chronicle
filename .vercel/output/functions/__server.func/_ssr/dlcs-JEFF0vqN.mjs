import { t as supabase } from "./client--JyBqMqn.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { T as Calendar, c as Sparkles } from "../_libs/lucide-react.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.mjs";
import { t as PageHeader } from "./PageHeader-CFJ1JsvX.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dlcs-JEFF0vqN.js
var import_jsx_runtime = require_jsx_runtime();
function DlcsPage() {
	const { data } = useQuery({
		queryKey: ["dlcs"],
		queryFn: async () => {
			const { data } = await supabase.from("dlcs").select("*").order("release_date", {
				ascending: false,
				nullsFirst: false
			});
			return data ?? [];
		}
	});
	const released = data?.filter((d) => d.status === "released") ?? [];
	const upcoming = data?.filter((d) => d.status === "upcoming") ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-7xl mx-auto px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Expansiones del Reino",
			subtitle: "Todos los DLCs lanzados y los que están por venir"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "released",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "bg-secondary/40 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
						value: "released",
						children: [
							"Disponibles (",
							released.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
						value: "upcoming",
						children: [
							"Próximos (",
							upcoming.length,
							")"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "released",
					className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
					children: released.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DlcCard, { dlc: d }, d.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "upcoming",
					className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
					children: upcoming.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DlcCard, { dlc: d }, d.id))
				})
			]
		})]
	});
}
function DlcCard({ dlc }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "parchment rounded-lg overflow-hidden",
		children: [dlc.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "aspect-video overflow-hidden relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: dlc.image_url,
				alt: dlc.name,
				className: "w-full h-full object-cover",
				loading: "lazy"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-2 right-2",
				children: dlc.status === "upcoming" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					className: "bg-[color:var(--burgundy)] text-foreground border-gold/40",
					children: "Próximamente"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					className: "bg-gradient-gold text-primary-foreground",
					children: "Disponible"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl text-gold",
					children: dlc.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground mt-1 flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }), dlc.status === "released" ? dlc.release_date && new Date(dlc.release_date).toLocaleDateString("es-ES", {
						year: "numeric",
						month: "long",
						day: "numeric"
					}) : dlc.estimated_release]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-foreground/85 mt-3",
					children: dlc.description
				}),
				dlc.features && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 pt-3 border-t border-gold/20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-gold/80 uppercase tracking-wider flex items-center gap-1 mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), " Características"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: dlc.features
					})]
				})
			]
		})]
	});
}
//#endregion
export { DlcsPage as component };
