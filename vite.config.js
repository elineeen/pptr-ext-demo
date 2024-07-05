import path from "path";
import { defineConfig } from "vite";
import browserExtension from "vite-plugin-web-extension";
import vue from "@vitejs/plugin-vue";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'
function root(...paths){
  return path.resolve(__dirname, ...paths);
}

export default defineConfig({
  build: {
    outDir: root("dist"),
    emptyOutDir: true,
    rollupOptions:{
      // input: {
      //   main: resolve(__dirname, 'src/popup/index.html'),
      // },
      output:{
        sanitizeFileName:(e)=>"ev_"
      },
      //build error without this config
      // external:['debug','stream','child_process']
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports:[
        // 预设
        'vue',
      ],
      // resolvers: [ElementPlusResolver()],
    }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
    browserExtension({
      skipManifestValidation:true,
      manifest: "src/manifest.json",
      browser: process.env.TARGET ?? "chrome",
    }),
  ],
});
