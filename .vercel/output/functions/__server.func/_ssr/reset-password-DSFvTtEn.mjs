import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client--JyBqMqn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { v as LoaderCircle, x as Crown } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { n as Label, t as Input } from "./label-B7oQAA24.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-DSFvTtEn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPasswordPage() {
	const router = useRouter();
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const onSubmit = async (e) => {
		e.preventDefault();
		if (password.length < 6) return toast.error("Mínimo 6 caracteres");
		setLoading(true);
		const { error } = await supabase.auth.updateUser({ password });
		setLoading(false);
		if (error) return toast.error(error.message);
		toast.success("Contraseña actualizada");
		router.navigate({ to: "/" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center p-4 bg-gradient-royal",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "w-full max-w-md parchment rounded-lg p-8 shadow-royal space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-10 w-10 text-gold mx-auto mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl text-gold",
						children: "Nueva Contraseña"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Contraseña nueva" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "password",
					value: password,
					onChange: (e) => setPassword(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: loading,
					className: "w-full bg-gradient-gold text-primary-foreground font-display",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Guardar"
				})
			]
		})
	});
}
//#endregion
export { ResetPasswordPage as component };
