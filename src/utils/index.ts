/*
 * @Author: zhicheng ran
 * @Date: 2023-03-23 14:21:14
 * @LastEditTime: 2023-03-23 14:23:38
 * @FilePath: \format-factory\src\utils\index.ts
 * @Description:
 */

/**
 * @description 初始化ffmpeg
 */
export async function initFfmpeg() {
  const { createFFmpeg } = await import("@ffmpeg/ffmpeg");
  const ffmpeg = createFFmpeg({
    log: true,
    progress: (p) => {
      console.log(p);
    }, //回调 展示进度
  });
  return ffmpeg;
}
