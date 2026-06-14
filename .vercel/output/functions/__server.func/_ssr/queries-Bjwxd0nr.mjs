import { t as supabase } from "./client-BDk6QgZS.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-Bjwxd0nr.js
function useCurrentUser() {
	return useQuery({
		queryKey: ["currentUser"],
		queryFn: async () => {
			const { data } = await supabase.auth.getUser();
			return data.user;
		},
		staleTime: 6e4
	});
}
//#endregion
export { useCurrentUser as t };
