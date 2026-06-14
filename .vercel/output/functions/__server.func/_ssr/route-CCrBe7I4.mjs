import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client--JyBqMqn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useRouter, o as Outlet, u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { E as BookOpen, _ as LogOut, g as Menu, m as Newspaper, n as Users, o as Swords, p as Package, r as User, t as X, x as Crown } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-CCrBe7I4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/",
		label: "Inicio",
		icon: Crown,
		exact: true
	},
	{
		to: "/news",
		label: "Noticias",
		icon: Newspaper
	},
	{
		to: "/dlcs",
		label: "DLCs",
		icon: Package
	},
	{
		to: "/community",
		label: "Comunidad",
		icon: Users
	},
	{
		to: "/guides",
		label: "Guías",
		icon: BookOpen
	},
	{
		to: "/characters",
		label: "Personajes",
		icon: Swords
	},
	{
		to: "/profile",
		label: "Perfil",
		icon: User
	}
];
function SiteLayout({ children }) {
	const router = useRouter();
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setOpen(false), [router.state.location.pathname]);
	const signOut = async () => {
		await supabase.auth.signOut();
		router.navigate({
			to: "/auth",
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-[color:var(--gold)]/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2 group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-6 w-6 text-gold group-hover:scale-110 transition" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl tracking-widest text-gold",
								children: "REINO"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden lg:flex items-center gap-1",
							children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								activeProps: { className: "text-gold bg-secondary/60" },
								activeOptions: { exact: item.exact ?? false },
								className: "px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-gold hover:bg-secondary/40 transition flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4" }), item.label]
							}, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden lg:flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: signOut,
								className: "text-foreground/80 hover:text-gold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4 mr-2" }), " Salir"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "lg:hidden p-2 text-gold",
							onClick: () => setOpen((o) => !o),
							"aria-label": "Menú",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-6 w-6" })
						})
					]
				}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:hidden border-t border-[color:var(--gold)]/30 bg-background/95",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex flex-col p-2",
						children: [NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							activeProps: { className: "text-gold bg-secondary/60" },
							activeOptions: { exact: item.exact ?? false },
							className: "px-3 py-3 rounded-md text-sm font-medium flex items-center gap-3 hover:bg-secondary/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4" }), item.label]
						}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: signOut,
							className: cn("px-3 py-3 rounded-md text-sm font-medium flex items-center gap-3 hover:bg-secondary/40 text-left"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Cerrar Sesión"]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-[color:var(--gold)]/30 py-6 mt-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground font-display tracking-wider",
					children: "❖ REINO · Forjado por la comunidad de Crusader Kings III ❖"
				})
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
//#endregion
export { SplitComponent as component };
