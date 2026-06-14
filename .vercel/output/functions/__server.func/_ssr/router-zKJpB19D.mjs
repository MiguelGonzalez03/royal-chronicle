import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client--JyBqMqn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as redirect, a as createRouter, c as createFileRoute, d as useRouter, l as createRootRouteWithContext, n as Scripts, o as Outlet, r as HeadContent, s as lazyRouteComponent, u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$14 } from "./community._category-6xi9EZOf.mjs";
import { t as Route$15 } from "./community.new-B2BXJOQ4.mjs";
import { t as Route$16 } from "./community.post._id-QVw4vFs9.mjs";
import { t as Route$17 } from "./guides._id-DGyznZWP.mjs";
import { t as Route$18 } from "./news._id-DCgMAv64.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-zKJpB19D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-OFwV9n9L.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Reino — Comunidad Crusader Kings III" },
			{
				name: "description",
				content: "La comunidad medieval definitiva para Crusader Kings III: noticias, DLCs, guías, foro y personajes recomendados."
			},
			{
				name: "author",
				content: "Reino"
			},
			{
				property: "og:title",
				content: "Reino — Comunidad Crusader Kings III"
			},
			{
				property: "og:description",
				content: "Noticias, DLCs, foro y guías de Crusader Kings III."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "es",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((event) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			router.invalidate();
			if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
		});
		return () => sub.subscription.unsubscribe();
	}, [router, queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-right"
		})]
	});
}
var $$splitComponentImporter$12 = () => import("./reset-password-DSFvTtEn.mjs");
var Route$12 = createFileRoute("/reset-password")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./auth-CwkmfZxU.mjs");
var Route$11 = createFileRoute("/auth")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	ssr: false
});
var $$splitComponentImporter$10 = () => import("./route-CCrBe7I4.mjs");
var Route$10 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("../_authenticated-C_-7Af83.mjs");
var Route$9 = createFileRoute("/_authenticated/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./profile-CwXZg2yN.mjs");
var Route$8 = createFileRoute("/_authenticated/profile")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./news-JmMi63P3.mjs");
var Route$7 = createFileRoute("/_authenticated/news")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./guides-C9qttYKN.mjs");
var Route$6 = createFileRoute("/_authenticated/guides")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./dlcs-JEFF0vqN.mjs");
var Route$5 = createFileRoute("/_authenticated/dlcs")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./community-D90lIXaO.mjs");
var Route$4 = createFileRoute("/_authenticated/community")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./characters-BUEfThP5.mjs");
var Route$3 = createFileRoute("/_authenticated/characters")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./guides.index-1nKXAkPb.mjs");
var Route$2 = createFileRoute("/_authenticated/guides/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./community.index-BvZTR_Cl.mjs");
var Route$1 = createFileRoute("/_authenticated/community/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./guides.new-ay8E0ZFs.mjs");
var Route = createFileRoute("/_authenticated/guides/new")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var ResetPasswordRoute = Route$12.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$13
});
var AuthRoute = Route$11.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$13
});
var AuthenticatedRouteRoute = Route$10.update({
	id: "/_authenticated",
	getParentRoute: () => Route$13
});
var AuthenticatedIndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfileRoute = Route$8.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedNewsRoute = Route$7.update({
	id: "/news",
	path: "/news",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedGuidesRoute = Route$6.update({
	id: "/guides",
	path: "/guides",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDlcsRoute = Route$5.update({
	id: "/dlcs",
	path: "/dlcs",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCommunityRoute = Route$4.update({
	id: "/community",
	path: "/community",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCharactersRoute = Route$3.update({
	id: "/characters",
	path: "/characters",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedGuidesIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedGuidesRoute
});
var AuthenticatedCommunityIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedCommunityRoute
});
var AuthenticatedNewsIdRoute = Route$18.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AuthenticatedNewsRoute
});
var AuthenticatedGuidesNewRoute = Route.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => AuthenticatedGuidesRoute
});
var AuthenticatedGuidesIdRoute = Route$17.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AuthenticatedGuidesRoute
});
var AuthenticatedCommunityNewRoute = Route$15.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => AuthenticatedCommunityRoute
});
var AuthenticatedCommunityRouteChildren = {
	AuthenticatedCommunityCategoryRoute: Route$14.update({
		id: "/$category",
		path: "/$category",
		getParentRoute: () => AuthenticatedCommunityRoute
	}),
	AuthenticatedCommunityNewRoute,
	AuthenticatedCommunityIndexRoute,
	AuthenticatedCommunityPostIdRoute: Route$16.update({
		id: "/post/$id",
		path: "/post/$id",
		getParentRoute: () => AuthenticatedCommunityRoute
	})
};
var AuthenticatedCommunityRouteWithChildren = AuthenticatedCommunityRoute._addFileChildren(AuthenticatedCommunityRouteChildren);
var AuthenticatedGuidesRouteChildren = {
	AuthenticatedGuidesIdRoute,
	AuthenticatedGuidesNewRoute,
	AuthenticatedGuidesIndexRoute
};
var AuthenticatedGuidesRouteWithChildren = AuthenticatedGuidesRoute._addFileChildren(AuthenticatedGuidesRouteChildren);
var AuthenticatedNewsRouteChildren = { AuthenticatedNewsIdRoute };
var AuthenticatedRouteRouteChildren = {
	AuthenticatedCharactersRoute,
	AuthenticatedCommunityRoute: AuthenticatedCommunityRouteWithChildren,
	AuthenticatedDlcsRoute,
	AuthenticatedGuidesRoute: AuthenticatedGuidesRouteWithChildren,
	AuthenticatedNewsRoute: AuthenticatedNewsRoute._addFileChildren(AuthenticatedNewsRouteChildren),
	AuthenticatedProfileRoute,
	AuthenticatedIndexRoute
};
var rootRouteChildren = {
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	ResetPasswordRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
