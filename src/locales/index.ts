/*
 * @Author: zhicheng ran
 * @Date: 2023-04-04 16:21:23
 * @LastEditTime: 2023-04-06 15:55:39
 * @FilePath: \format-factory\src\locales\index.ts
 * @Description:
 */
import { ELEMENT_LOCALE } from '@/constants';
import { locale as LocalInstance } from '@/store';
import { nextTick } from 'vue';
import { createI18n, I18n, Locale } from 'vue-i18n';
import en from './lang/en.json';

export const i18n = createI18n({
  // something vue-i18n options here ...
  // legacy: false,
  locale: 'en',
  messages: {
    en,
  } as any,
});

export function setI18nLanguage(
  i18n: I18n,
  locale: Locale,
) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else if (typeof i18n.global.locale !== 'string') {
    i18n.global.locale.value = locale;
  }
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document
    ?.querySelector('html')
    ?.setAttribute('lang', locale);
}

export async function loadLocaleMessages(
  i18n: I18n,
  locale: Locale,
) {
  // load locale messages with dynamic import
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `./lang/${locale}.json`
  );
  // load element-plus lang
  const { default: lang } = await ELEMENT_LOCALE[locale]();

  // set element-plus lang
  LocalInstance.value = lang;
  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default);
  return nextTick();
}
