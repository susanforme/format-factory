import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./assets/reset.less";
import { isDev, log } from "./utils";

if (!isDev) {
  log();
}
// if (!crossOriginIsolated) {
//   //@ts-ignore
//   window.SharedArrayBuffer = ArrayBuffer;
// }

createApp(App).use(router).mount("#app");
