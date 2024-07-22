import { defineConfig } from 'vite'
import {fileURLToPath, URL} from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    server: {
      proxy: {
        '/rtzhApi': {
          target: 'http://172.18.8.231:18001',
          changeOrigin: true,
          pathRewrite: {
            "^/rtzhApi": "/",
          },
        },
        '/rtzhApiFast': {
          target: 'http://172.18.8.231:18002',
          changeOrigin: true,
          pathRewrite: {
            "^/rtzhApiFast": "/",
          },
        },
        '/api': {
          target: 'http://127.0.0.1:3000',
          changeOrigin: true,
          pathRewrite: {
            "^/api": "/api",
          },
        },
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      vue()
    ],
  }
})
