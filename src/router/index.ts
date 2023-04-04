/*
 * @Author: zhicheng ran
 * @Date: 2023-03-10 15:12:33
 * @LastEditTime: 2023-04-04 16:41:27
 * @FilePath: \format-factory\src\router\index.ts
 * @Description:
 */
import { LANGUAGE_CODE_ENTITY } from '@/constants';
import {
  loadLocaleMessages,
  setI18nLanguage,
  setupI18n,
} from '@/locales';
import {
  createRouter,
  createWebHashHistory,
} from 'vue-router';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/zh-CN/video',
    },
    {
      name: 'video',
      path: '/:locale/video',
      component: () => import('@/views/Video/Video.vue'),
      meta: {
        title: '视频',
      },
    },
    {
      name: 'picture',
      path: '/:locale/picture',
      component: () =>
        import('@/views/Picture/Picture.vue'),
      meta: {
        title: '图像',
      },
    },
    {
      name: 'audio',
      path: '/:locale/audio',
      component: () => import('@/views/Audio/Audio.vue'),
      meta: {
        title: '音频',
      },
    },
  ],
});
const i18n = setupI18n({
  locale: LANGUAGE_CODE_ENTITY.en,
});
router.beforeEach(async (to, from, next) => {
  const paramsLocale = to.params.locale as string;
  // use locale if paramsLocale is not in SUPPORT_LOCALES
  // load locale messages
  if (
    !i18n.global.availableLocales.includes(paramsLocale)
  ) {
    await loadLocaleMessages(i18n, paramsLocale);
  }
  // set i18n language
  setI18nLanguage(i18n, paramsLocale);

  return next();
});

// TODO: 添加路由守卫,切换路由销毁ffmpeg或加载
