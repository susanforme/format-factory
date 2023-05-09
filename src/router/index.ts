/*
 * @Author: zhicheng ran
 * @Date: 2023-03-10 15:12:33
 * @LastEditTime: 2023-05-09 14:08:34
 * @FilePath: \format-factory\src\router\index.ts
 * @Description:
 */
import {
  i18n,
  loadLocaleMessages,
  setI18nLanguage,
} from '@/locales';
import NProgress from 'nprogress';
import {
  createRouter,
  createWebHashHistory,
} from 'vue-router';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/en/video',
    },
    {
      name: 'language',
      path: '/:locale',
      children: [
        {
          name: 'video',
          path: 'video',
          component: () =>
            import('@/views/Video/Video.vue'),
        },
        {
          name: 'pic',
          path: 'picture',
          component: () =>
            import('@/views/Picture/Picture.vue'),
        },
        {
          name: 'audio',
          path: 'audio',
          component: () =>
            import('@/views/Audio/Audio.vue'),
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const paramsLocale = to.params.locale as string;
  const fromLocale = from.params.locale as string;
  if (fromLocale !== paramsLocale && paramsLocale) {
    // use locale if paramsLocale is not in SUPPORT_LOCALES
    // load locale messages
    if (
      !i18n.global.availableLocales.includes(paramsLocale)
    ) {
      await loadLocaleMessages(i18n, paramsLocale);
    }
    // set i18n language
    setI18nLanguage(i18n, paramsLocale);
    document.title = i18n.global.t('homeTitle');
  }
  return next();
});

router.afterEach(() => {
  // 关闭进度条
  NProgress.done();
});

// TODO: 添加路由守卫,切换路由销毁ffmpeg或加载
