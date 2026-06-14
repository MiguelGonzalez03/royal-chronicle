import { c as createFileRoute, s as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community.new-B2BXJOQ4.js
var $$splitComponentImporter = () => import("./community.new-DOvVKhao.mjs");
var Route = createFileRoute("/_authenticated/community/new")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	validateSearch: (s) => ({ category: s.category ?? "" })
});
//#endregion
export { Route as t };
