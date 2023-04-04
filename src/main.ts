import 'element-plus/es/components/notification/style/css';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import './assets/reset.less';
import { router } from './router';

import { isDev, log } from './utils';

if (!isDev) {
  log();
}

const i18n = createI18n({
  // something vue-i18n options here ...
});

createApp(App).use(i18n).use(router).mount('#app');
