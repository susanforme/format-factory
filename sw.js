if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let t={};const o=e=>i(e,l),c={module:{uri:l},exports:t,require:o};s[l]=Promise.all(n.map((e=>c[e]||o(e)))).then((e=>(r(...e),t)))}}define(["./workbox-dfcd503c"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/Audio-49fc78c8.js",revision:null},{url:"assets/ffmpeg-core-d22dfcb4.js",revision:null},{url:"assets/index-09b43f8e.js",revision:null},{url:"assets/index-1a91a081.js",revision:null},{url:"assets/index-a11cbdf1.css",revision:null},{url:"assets/Picture-01e8f035.js",revision:null},{url:"assets/Video-3cf86b85.css",revision:null},{url:"assets/Video-99a1126f.js",revision:null},{url:"enable-threads.js",revision:"89afcfef46943168ff6b3d85296d7b4f"},{url:"index.html",revision:"d1cc25cde9769e1f9a68142c94403f76"},{url:"registerSW.js",revision:"48278a782d522ae4e2d39311356e9077"},{url:"manifest.webmanifest",revision:"36c77a310e4ed7fa4118d096918aa2ff"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/\.js$/,/\.css$/,/\.html$/,/\.wasm$/]})),e.registerRoute(/.*\.js.*/i,new e.StaleWhileRevalidate,"GET"),e.registerRoute(/.*\.wasm.*/i,new e.CacheOnly,"GET"),e.registerRoute(/.*css.*/,new e.StaleWhileRevalidate,"GET"),e.registerRoute(/.*(png|svga|ico).*/,new e.CacheFirst({cacheName:"seed-image",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:2592e3})]}),"GET")}));
