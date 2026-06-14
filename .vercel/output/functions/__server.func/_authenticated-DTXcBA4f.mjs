import { t as supabase } from "./_ssr/client-BDk6QgZS.mjs";
import { t as hero_map_default } from "./_ssr/hero-map-SZolpayk.mjs";
import { u as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
import { D as ArrowRight, E as BookOpen, m as Newspaper, n as Users, o as Swords, p as Package, x as Crown } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated-DTXcBA4f.js
var import_jsx_runtime = require_jsx_runtime();
var shield_default = "/assets/shield-CkSlS5qA.png";
var TILES = [
	{
		to: "/news",
		label: "Crónicas del Reino",
		desc: "Las últimas noticias",
		icon: Newspaper
	},
	{
		to: "/dlcs",
		label: "Expansiones",
		desc: "Conoce todos los DLCs",
		icon: Package
	},
	{
		to: "/community",
		label: "El Salón del Trono",
		desc: "Foro de la comunidad",
		icon: Users
	},
	{
		to: "/guides",
		label: "Códices y Guías",
		desc: "Aprende a reinar",
		icon: BookOpen
	},
	{
		to: "/characters",
		label: "Casas Notables",
		desc: "Personajes recomendados",
		icon: Swords
	},
	{
		to: "/profile",
		label: "Tu Estandarte",
		desc: "Perfil y logros",
		icon: Crown
	}
];
function Home() {
	const { data: news } = useQuery({
		queryKey: ["home-news"],
		queryFn: async () => {
			const { data } = await supabase.from("news").select("*").order("published_at", { ascending: false }).limit(3);
			return data ?? [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative h-[60vh] min-h-[420px] overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_map_default,
					alt: "",
					className: "absolute inset-0 w-full h-full object-cover",
					width: 1920,
					height: 1080
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: shield_default,
							alt: "",
							className: "h-28 w-28 mb-4 drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]",
							loading: "lazy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-5xl md:text-7xl text-gold tracking-widest drop-shadow-lg",
							children: "REINO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-lg md:text-xl text-foreground/90 italic font-display tracking-wide",
							children: "La comunidad medieval de Crusader Kings III"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-ornate w-72 mt-6" })
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "max-w-7xl mx-auto px-4 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl text-gold text-center mb-8 tracking-wider",
				children: "El Gran Salón"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5",
				children: TILES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: t.to,
					className: "group parchment rounded-lg p-6 hover:shadow-gold-glow hover:-translate-y-1 transition-all",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-12 w-12 rounded-full bg-gradient-gold grid place-items-center text-primary-foreground shadow-royal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg text-gold tracking-wide",
							children: t.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: t.desc
						})] })]
					})
				}, t.to))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "max-w-7xl mx-auto px-4 pb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl text-gold tracking-wider",
					children: "Últimas Noticias"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/news",
					className: "text-gold/80 hover:text-gold text-sm flex items-center gap-1",
					children: ["Ver todas ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid md:grid-cols-3 gap-5",
				children: news?.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/news/$id",
					params: { id: n.id },
					className: "parchment rounded-lg overflow-hidden group",
					children: [n.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-video overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: n.image_url,
							alt: n.title,
							className: "w-full h-full object-cover group-hover:scale-105 transition",
							loading: "lazy"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg text-gold line-clamp-2",
							children: n.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-2 line-clamp-3",
							children: n.summary
						})]
					})]
				}, n.id))
			})]
		})
	] });
}
//#endregion
export { Home as component };
