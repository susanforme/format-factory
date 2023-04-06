/*
 * @Author: zhicheng ran
 * @Date: 2023-03-29 14:54:05
 * @LastEditTime: 2023-04-06 15:12:09
 * @FilePath: \format-factory\src\constants\index.ts
 * @Description:
 */

export const MAGIC_STRING = '!@#$%';

/*
 * @Author: zhicheng ran
 * @Date: 2023-04-04 16:06:38
 * @LastEditTime: 2023-04-04 16:06:39
 * @FilePath: \format-factory\constants\index.ts
 * @Description:
 */
/** List of all languages supported   */
export enum LANGUAGE_CODE {
  /** chinese */
  'zh-CN' = 'zh-CN',
  /** traditional chinese */
  'zh-TW' = 'zh-TW',
  /** english */
  'en' = 'en',
  /** japanese */
  'ja' = 'ja',
  /** korean */
  'ko' = 'ko',
  /** french */
  'fr' = 'fr',
  /** german */
  'de' = 'de',
  /** spanish */
  'es' = 'es',
  /** italian */
  'it' = 'it',
  /** portuguese */
  'pt' = 'pt',
  /** russian */
  'ru' = 'ru',
  /** turkish */
  'tr' = 'tr',
}

/**
 * @description: get the language code of the entity
 */
export const LANGUAGE_CODE_ENTITY = (
  Object.keys(LANGUAGE_CODE) as LANGUAGE_CODE[]
).reduce((acc, cur: LANGUAGE_CODE) => {
  acc[cur] = cur;
  return acc;
}, {} as Record<LANGUAGE_CODE, LANGUAGE_CODE>);

/**
 * @description the language name
 */
export const LANGUAGE_NAME: Record<LANGUAGE_CODE, string> =
  {
    'zh-CN': '中文',
    'zh-TW': '繁體中文',
    en: 'English',
    ja: '日本語',
    ko: '한국어',
    fr: 'Français',
    de: 'Deutsch',
    es: 'Español',
    it: 'Italiano',
    pt: 'Português',
    ru: 'Русский',
    tr: 'Türkçe',
  };

export const ELEMENT_LOCALE = new Proxy<
  Record<string, () => Promise<any>>
>(
  {
    'zh-CN': () =>
      import('element-plus/es/locale/lang/zh-cn'),
    'zh-TW': () =>
      import('element-plus/es/locale/lang/zh-tw'),
    en: () => import('element-plus/es/locale/lang/en'),
    ja: () => import('element-plus/es/locale/lang/ja'),
    ko: () => import('element-plus/es/locale/lang/ko'),
    fr: () => import('element-plus/es/locale/lang/fr'),
    de: () => import('element-plus/es/locale/lang/de'),
    es: () => import('element-plus/es/locale/lang/es'),
    it: () => import('element-plus/es/locale/lang/it'),
    pt: () => import('element-plus/es/locale/lang/pt'),
    ru: () => import('element-plus/es/locale/lang/ru'),
    tr: () => import('element-plus/es/locale/lang/tr'),
  },
  {
    get(target: any, key) {
      if (target[key]) {
        return target[key];
      }
      return target['en'];
    },
  },
);
