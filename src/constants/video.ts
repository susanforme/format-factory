import { i18n } from '@/locales';

/*
 * @Author: zhicheng ran
 * @Date: 2023-05-09 14:26:06
 * @LastEditTime: 2023-05-09 14:31:21
 * @FilePath: \format-factory\src\constants\video.ts
 * @Description: video模块所需常量
 */
/**
 * @description ffmpeg导出速度预设
 */
export const FFMPEG_PRESET = [
  {
    label: i18n.global.t('ultrafast'),
    value: 'ultrafast',
  },
  {
    label: i18n.global.t('superfast'),
    value: 'superfast',
  },
  {
    label: i18n.global.t('veryfast'),
    value: 'veryfast',
  },
  {
    label: i18n.global.t('faster'),
    value: 'faster',
  },
  {
    label: i18n.global.t('fast'),
    value: 'fast',
  },
  {
    label: i18n.global.t('medium'),
    value: 'medium',
  },
  {
    label: i18n.global.t('slow'),
    value: 'slow',
  },
  {
    label: i18n.global.t('slower'),
    value: 'slower',
  },
  {
    label: i18n.global.t('veryslow'),
    value: 'veryslow',
  },
];

/**
 * @description ffmpeg支持的处理格式
 */
export const FFMPEG_VIDEO_FORMATS = [
  'mp4',
  'webm',
  'ogg',
  'avi',
  'mov',
  'flv',
  'wmv',
  'mkv',
  'm4v',
  '3gp',
  '3g2',
  'ts',
  'mts',
  'm2ts',
  'vob',
  'mxf',
  'f4v',
];
