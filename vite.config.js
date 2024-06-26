import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
// import ElementPlus from 'unplugin-element-plus/vite'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      }),
      // ElementPlus({
      //   useSource: true,
      // }),
    ],
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `@use "@/styles/element/index.scss" as *;`,
    //     },
    //   },
    // },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    base: './',
    build: {
      outDir: "dist",
      assetsDir: "assets", //指定静态资源存放路径
      // sourcemap: false, //是否构建source map 文件
      //minify: false,//是否压缩，在生产环境中使用压缩更省资源
      sourcemap: true, //是否构建source map 文件
      minify: true,//是否压缩，在生产环境中使用压缩更省资源
      rollupOptions: {
        output: {
          // 块文件名
          chunkFileNames: '[name]-[hash].js',
          // 资源文件名（例如 CSS、图片等）
          entryFileNames: '[name].js',
          assetFileNames: '[name].[ext]',
          // entryFileNames: '[name]-[hash].js',
          // assetFileNames: '[name]-[hash].[ext]',
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
        },
        '/api2': {
          target: 'http://localhost:1235/generator',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api2/, '')
        }
      },
      open: true
    }
  }
})