import { defineConfig, loadEnv } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(process.cwd(), ".."), "VITE_");
  console.log(env.FRONTEND_URL);
  return {
    envDir: path.resolve(process.cwd(), ".."),
    define: {
      // Provide an explicit app-level constant derived from an env var.
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    // Example: use an env var to set the dev server port conditionally.
    server: {
      port: env.VITE_FRONTEND_PORT ? Number(env.VITE_FRONTEND_PORT) : 3000,
    },
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  };
});
