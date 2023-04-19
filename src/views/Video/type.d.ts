/*
 * @Author: zhicheng ran
 * @Date: 2023-04-19 15:24:10
 * @LastEditTime: 2023-04-19 15:42:04
 * @FilePath: \format-factory\src\views\Video\type.d.ts
 * @Description:
 */
export type CommonConfig = {
  name: string;
};

/**
 * @description ffmpeg质量预设
 */
export enum FfmpegPreset {
  ultrafast = 'ultrafast',
  superfast = 'superfast',
  veryfast = 'veryfast',
  faster = 'faster',
  fast = 'fast',
  medium = 'medium',
  slow = 'slow',
  slower = 'slower',
  veryslow = 'veryslow',
  placebo = 'placebo',
}
