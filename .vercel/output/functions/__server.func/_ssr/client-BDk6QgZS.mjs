import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-BDk6QgZS.js
function createSupabaseClient() {
	return createClient("https://jmrbubnkxsvnoxxeoegh.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptcmJ1Ym5reHN2bm94eGVvZWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNzk5NzksImV4cCI6MjA5Njk1NTk3OX0.3f1PdVtZ9rqwXhFOXxFnC264cciky5hwAnLlAXnfDj4", { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };
