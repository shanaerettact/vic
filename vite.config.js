import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
          }
          return `m/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: "m/js/[name]-[hash].js",
        entryFileNames: "m/js/[name]-[hash].js",
      },
    },
  },
  server: {
    port: "3000",
    proxy: {
      "/site": { target: "https://testfront.vic999.vip", changeOrigin: true },
      "/user": { target: "https://testfront.vic999.vip", changeOrigin: true },
      "/file": { target: "https://testfront.vic999.vip", changeOrigin: true },
      "/gc-api": { target: "https://testfront.vic999.vip", changeOrigin: true },
      "/third-pay": { target: "https://testfront.vic999.vip", changeOrigin: true },
      "/social": { target: "https://testfront.vic999.vip", changeOrigin: true },
    },
  },
});
