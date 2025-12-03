import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import notice from "./notice.json";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: notice?.result?.settings?.baseUrl || "/",
});
