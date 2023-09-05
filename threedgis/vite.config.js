import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// import { createHtmlPlugin } from 'vite-plugin-html'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue3d/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      public: resolve(__dirname, 'public'),
    },
  },
  // '/api': {
  //   target: 'http://153.101.160.58:9023',
  //   changeOrigin: true,
  //   configure: (proxy, options) => {
  //     // proxy 是 'http-proxy' 的实例
  //   }
  // },
  // server:{
  //   port:3000,
  //   '/api': {
  //   target: 'http://153.101.160.58:9023',
  //   changeOrigin: true,
  //   pathRewrite: (proxy, options) => {

  //   }
  // },
  // },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        },
      },
    },
  },
  plugins: [
    vue(),
    // createHtmlPlugin({
    //   inject: {
    //     data: {
    //       //将环境变量 VITE_APP_TITLE 赋值给 title 方便 html页面使用 title 获取系统标题
    //       title: getViteEnv(process.env, 'VITE_APP_TITLE'),
    //     },
    //   },
    // }),
  ],
})
