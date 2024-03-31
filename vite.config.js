import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv  } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{

  const env = loadEnv(mode, __dirname)
  return {
    plugins: [
      vue(),
      // legacy({
      //   targets:['ie>=11'],
      //   additionalLegacyPolyfills:['regenerator-runtime/runtime'],
      //   //renderModernChunks: false,
      //  })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    base:'./',
    build: {
      outDir: "dist",
      assetsDir: "assets", //指定静态资源存放路径
      sourcemap: false, //是否构建source map 文件
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://codeserver.t.vtoone.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }

  }
})