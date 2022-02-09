import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ViteRequireContext from '@originjs/vite-plugin-require-context';
import * as path from "path";

const cssPath = path.resolve(__dirname, "./src/assets");

// https://vitejs.dev/config/
export default defineConfig({
  css: {
      preprocessorOptions: {
          scss: {
              additionalData: `@import "${cssPath}/css/index.scss";`
          }
      }
  },
  plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      ViteRequireContext()
  ]
})
