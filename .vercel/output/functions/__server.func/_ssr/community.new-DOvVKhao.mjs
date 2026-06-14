import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client--JyBqMqn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useRouter, u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { O as ArrowLeft, v as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { n as Label, t as Input } from "./label-B7oQAA24.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useForm, t as a } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
import { t as PageHeader } from "./PageHeader-CFJ1JsvX.mjs";
import { t as Route } from "./community.new-B2BXJOQ4.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as useCurrentUser } from "./queries-J5rxyFkP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community.new-DOvVKhao.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	title: stringType().trim().min(3, "Mínimo 3 caracteres").max(150),
	content: stringType().trim().min(10, "Cuenta más, mi señor").max(5e3),
	category_id: stringType().uuid("Elige una categoría")
});
function NewPostPage() {
	const router = useRouter();
	const search = Route.useSearch();
	const { data: user } = useCurrentUser();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [categories, setCategories] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		supabase.from("forum_categories").select("id,name,slug").order("sort_order").then(({ data }) => {
			setCategories(data ?? []);
		});
	}, []);
	const form = useForm({
		resolver: a(schema),
		defaultValues: {
			title: "",
			content: "",
			category_id: ""
		}
	});
	(0, import_react.useEffect)(() => {
		if (search.category && categories.length) {
			const found = categories.find((c) => c.slug === search.category);
			if (found) form.setValue("category_id", found.id);
		}
	}, [
		search.category,
		categories,
		form
	]);
	const onSubmit = async (v) => {
		if (!user) return toast.error("Inicia sesión");
		setLoading(true);
		const { data, error } = await supabase.from("posts").insert({
			...v,
			user_id: user.id
		}).select().single();
		setLoading(false);
		if (error) return toast.error(error.message);
		toast.success("Pergamino publicado");
		router.navigate({
			to: "/community/post/$id",
			params: { id: data.id }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl mx-auto px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/community",
				className: "inline-flex items-center gap-2 text-gold/80 hover:text-gold mb-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Volver"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Nuevo Pergamino",
				subtitle: "Comparte tu crónica con la comunidad"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: form.handleSubmit(onSubmit),
				className: "parchment rounded-lg p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Categoría" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.watch("category_id"),
							onValueChange: (v) => form.setValue("category_id", v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Elige una categoría" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: c.id,
								children: c.name
							}, c.id)) })]
						}),
						form.formState.errors.category_id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-destructive mt-1",
							children: form.formState.errors.category_id.message
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Título" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...form.register("title") }),
						form.formState.errors.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-destructive mt-1",
							children: form.formState.errors.title.message
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Contenido" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 8,
							...form.register("content")
						}),
						form.formState.errors.content && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-destructive mt-1",
							children: form.formState.errors.content.message
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: loading,
						className: "bg-gradient-gold text-primary-foreground font-display w-full",
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Publicar"
					})
				]
			})
		]
	});
}
//#endregion
export { NewPostPage as component };
