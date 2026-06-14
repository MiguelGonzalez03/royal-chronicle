import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Añadimos la configuración para que use el adaptador de Netlify
  nitro: {
    preset: "netlify",
  },
});