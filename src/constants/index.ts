/*
 * @Author: zhicheng ran
 * @Date: 2023-03-29 14:54:05
 * @LastEditTime: 2023-04-04 16:28:39
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
