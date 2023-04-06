import 'element-plus/es/components/notification/style/css';
import { createApp } from 'vue';
import './assets/reset.less';
import { i18n } from './locales';
import Root from './Root.vue';
import { router } from './router';

import { isDev, log } from './utils';

if (!isDev) {
  log();
}

createApp(Root).use(i18n).use(router).mount('#app');
