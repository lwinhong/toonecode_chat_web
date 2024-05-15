import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    base: './',
    build: {
      outDir: "dist",
      assetsDir: "assets", //指定静态资源存放路径
      sourcemap: false, //是否构建source map 文件
      minify: false,
      rollupOptions: {
        output: {
          entryFileNames: '[name].js',
          // 块文件名
          chunkFileNames: '[name]-[hash].js',
          // 资源文件名（例如 CSS、图片等）
          assetFileNames: '[name].[ext]'
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 5173, //这里的端口跟配置开发环境文件# .env.development的端口要一致
      proxy: {
        '/api1': {
          target: 'http://ai.t.vtoone.com/api/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api1/, '')
        }
      },
      open: true
    }
  }
})