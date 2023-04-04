import 'element-plus/es/components/notification/style/css';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/reset.less';
import { router } from './router';

import { isDev, log } from './utils';

if (!isDev) {
  log();
}

createApp(App).use(router).mount('#app');
