import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

// import basicSsl from '@vitejs/plugin-basic-ssl'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  // server: {
  //   https: true,
  // },
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
  plugins: [
    // VitePWA({
    //   registerType: "autoUpdate",
    //   devOptions: {
    //     enabled: true,
    //   },
    //   workbox: {
    //     clientsClaim: true,
    //     skipWaiting: true,
    //     navigateFallbackDenylist: [/\.js$/, /\.css$/, /\.html$/, /\.wasm$/],
    //     runtimeCaching: [
    //       // 第三方包cache first   本地代码不缓存
    //       {
    //         urlPattern: /.*\.js.*/i,
    //         // https://developer.chrome.com/docs/workbox/reference/workbox-strategies/
    //         handler: "StaleWhileRevalidate",
    //         // options: {
    //         //   cacheName: 'seed-js',
    //         //   expiration: {
    //         //     maxEntries: 100, //最多缓存20个，超过的按照LRU原则删除
    //         //     maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    //         //   },
    //         // },
    //       },
    //       {
    //         urlPattern: /.*\.wasm.*/i,
    //         // https://developer.chrome.com/docs/workbox/reference/workbox-strategies/
    //         handler: "CacheOnly",
    //         // options: {
    //         //   cacheName: 'seed-js',
    //         //   expiration: {
    //         //     maxEntries: 100, //最多缓存20个，超过的按照LRU原则删除
    //         //     maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    //         //   },
    //         // },
    //       },
    //       {
    //         urlPattern: /.*css.*/,
    //         handler: "StaleWhileRevalidate",
    //         // options: {
    //         //   cacheName: 'seed-css',
    //         //   expiration: {
    //         //     maxEntries: 100, //最多缓存30个，超过的按照LRU原则删除
    //         //     maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    //         //   },
    //         // },
    //       },
    //       {
    //         urlPattern: /.*(png|svga|ico).*/,
    //         handler: "CacheFirst",
    //         options: {
    //           cacheName: "seed-image",
    //           expiration: {
    //             maxEntries: 100, //最多缓存30个，超过的按照LRU原则删除
    //             maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    //           },
    //         },
    //       },
    //     ],
    //   },
    // }),
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver({})],
      dts: 'src/components.d.ts',
    }),
  ],
  build: {
    // target: "chrome94",
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: {
          'element-plus': ['element-plus'],
        },
      },
    },
  },
});
