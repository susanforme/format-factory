import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./assets/reset.less";
import "element-plus/es/components/notification/style/css";

import { isDev, log } from "./utils";

if (!isDev) {
  log();
}

createApp(App).use(router).mount("#app");
