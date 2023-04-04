/*
 * @Author: zhicheng ran
 * @Date: 2023-04-04 16:21:23
 * @LastEditTime: 2023-04-04 16:24:51
 * @FilePath: \format-factory\src\locales\index.ts
 * @Description:
 */
import { nextTick } from 'vue';
import { createI18n, I18n, Locale } from 'vue-i18n';

export function setupI18n(options = { locale: 'en' }) {
  const i18n = createI18n(options);
  setI18nLanguage(i18n, options.locale);
  return i18n;
}

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
  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default);
  return nextTick();
}
