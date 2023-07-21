import type { FFmpeg } from '@ffmpeg/ffmpeg';

export class FFmpegGenerator {
  // 只有一个实例
  static instance: FFmpeg | null = null;
  /**
 @description 初始化ffmpeg
 * https://github.com/ffmpegwasm/ffmpeg.wasm/issues/121#issuecomment-1111638578
 */
  static async init() {
    if (!FFmpegGenerator.instance) {
      const { createFFmpeg } = await import(
        '@ffmpeg/ffmpeg'
      );
      const ffmpegInstance = createFFmpeg({
        log: true,
        progress: p => {
          console.log(p);
        }, //回调 展示进度
        workerPath: new URL(
          '../lib/ffmpeg/ffmpeg-core.worker.js',
          import.meta.url,
        ).href,
        corePath: new URL(
          '../lib/ffmpeg/ffmpeg-core.js',
          import.meta.url,
        ).href,
        wasmPath: new URL(
          '../lib/ffmpeg/ffmpeg-core.wasm',
          import.meta.url,
        ).href,
        //TODO:  低版本报错 低版本手动构建 https://github.com/ffmpegwasm/ffmpeg.wasm/issues/137#issuecomment-1014956114
        // ...(isDev
        //   ? {
        //       corePath: new URL("@ffmpeg/core/dist/ffmpeg-core.js", import.meta.url)
        //         .href,
        //     }
        //   : {}),
      });
      await ffmpegInstance.load();
      FFmpegGenerator.instance = ffmpegInstance;
      return ffmpegInstance;
    } else {
      return FFmpegGenerator.instance;
    }
  }
  getInstance() {
    return FFmpegGenerator.instance;
  }
  /**
   * @description 销毁ffmpeg
   */
  static destoryFfmpeg() {
    FFmpegGenerator.instance?.exit();
    FFmpegGenerator.instance = null;
  }
}
