const CACHE_VERSION = "v2";

/**@type {ServiceWorkerGlobalScope} sw */
const sw = self;
async function wait() {
  await sw.clients.claim();
  // const cache = await caches.open(CACHE_VERSION);
  // await cache.addAll([
  //   "/sw-test/",
  //   "/sw-test/index.html",
  //   "/sw-test/style.css",
  //   "/sw-test/app.js",
  //   "/sw-test/image-list.js",
  //   "/sw-test/star-wars-logo.jpg",
  //   "/sw-test/gallery/bountyHunters.jpg",
  //   "/sw-test/gallery/myLittleVader.jpg",
  //   "/sw-test/gallery/snowTroopers.jpg",
  // ]);
  return;
}

/**
 *  @param {Request} request
 */
async function handleFetch(request) {
  if (request.url.includes("chrome-extension")) {
    return;
  }
  if (request.cache === "only-if-cached" && request.mode !== "same-origin") {
    return;
  }
  if (request.mode === "no-cors") {
    // We need to set `credentials` to "omit" for no-cors requests, per this comment: https://bugs.chromium.org/p/chromium/issues/detail?id=1309901#c7
    request = new Request(request.url, {
      cache: request.cache,
      credentials: "omit",
      headers: request.headers,
      integrity: request.integrity,
      destination: request.destination,
      keepalive: request.keepalive,
      method: request.method,
      mode: request.mode,
      redirect: request.redirect,
      referrer: request.referrer,
      referrerPolicy: request.referrerPolicy,
      signal: request.signal,
    });
  }
  // 声明请求
  let r;
  // 获取缓存
  // 强缓存
  const strongCacheReg = [
    // https://regex101.com/
    /.*\.wasm.*/i,
    /.*\.json.*/i,
    /.*(png|svga|ico).*/,
    // element包
    /element-plus-\w*\.js/,
    /content\.css/,
  ];
  // 匹配强缓存结果
  const matchStrongCache = strongCacheReg.some((reg) => reg.test(request.url));
  // 匹配强缓存成功
  if (matchStrongCache) {
    r = await caches
      .match(request)
      .catch((e) => console.error("缓存输出错误", e));
    // 缓存不存在
    if (!r) {
      r = await fetch(request).catch((e) => console.error(e));
      // 更新缓存
      const cache = await caches.open(CACHE_VERSION);
      cache.put(request, r.clone());
    } else {
      console.log("🚀🚀🚀🚀🚀", "缓存命中", request.url);
    }
  } else {
    r = await fetch(request).catch((e) => console.error(e));
  }

  if (r.status === 0) {
    return r;
  }
  const headers = new Headers(r.headers);
  headers.set("Cross-Origin-Embedder-Policy", "require-corp"); // or: require-corp
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  return new Response(r.body, {
    status: r.status,
    statusText: r.statusText,
    headers,
  });
}
if (typeof window === "undefined") {
  // @type {ServiceWorkerGlobalScope}
  sw.addEventListener("install", () => sw.skipWaiting());
  sw.addEventListener("activate", (e) => e.waitUntil(wait()));
  sw.addEventListener("fetch", function (e) {
    // respondWith must be executed synchronously (but can be passed a Promise)
    const blacklist =['hm.baidu.com','www.googletagmanager.com'];
    if(!blacklist.some(v=>e.request.url.includes(v))){
      e.respondWith(handleFetch(e.request));
    }
  });
} else {
  (async function () {
    //!!测试注销
    if (window.crossOriginIsolated !== false) return;
    let registration = await navigator.serviceWorker
      .register(window.document.currentScript.src)
      .catch((e) =>
        console.error("COOP/COEP Service Worker failed to register:", e)
      );
    if (registration) {
      console.log("COOP/COEP Service Worker registered", registration.scope);

      registration.addEventListener("updatefound", () => {
        console.log(
          "Reloading page to make use of updated COOP/COEP Service Worker."
        );
        window.location.reload();
      });

      // If the registration is active, but it's not controlling the page
      if (registration.active && !navigator.serviceWorker.controller) {
        console.log("Reloading page to make use of COOP/COEP Service Worker.");
        window.location.reload();
      }
    }
  })();
}

// Code to deregister:
// let registrations = await navigator.serviceWorker.getRegistrations();
// for(let registration of registrations) {
//   await registration.unregister();
// }
