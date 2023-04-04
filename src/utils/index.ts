import type { FFmpeg } from '@ffmpeg/ffmpeg';
import { ResultObject } from 'mediainfo.js/dist/types';
import { version } from '../../package.json';

let ffmpeg: FFmpeg | null = null;
/**
 @description 初始化ffmpeg
 * https://github.com/ffmpegwasm/ffmpeg.wasm/issues/121#issuecomment-1111638578
 */
export async function initFfmpeg() {
  if (!ffmpeg) {
    const { createFFmpeg } = await import('@ffmpeg/ffmpeg');
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
    ffmpeg = ffmpegInstance;
    return ffmpegInstance;
  } else {
    return ffmpeg;
  }
}

/**
 * @description 销毁ffmpeg
 */
export function destoryFfmpeg() {
  ffmpeg?.exit();
  ffmpeg = null;
}

/**
 * @description 生成初音未来logo
 */
export function log() {
  console.log(
    [
      ' _______________#########_______________________ ',
      ' ______________############_____________________ ',
      ' ______________#############____________________ ',
      ' _____________##__###########___________________ ',
      ' ____________###__######_#####__________________ ',
      ' ____________###_#######___####_________________ ',
      ' ___________###__##########_####________________ ',
      ' __________####__###########_####_______________ ',
      ' ________#####___###########__#####_____________ ',
      ' _______######___###_########___#####___________ ',
      ' _______#####___###___########___######_________ ',
      ' ______######___###__###########___######_______ ',
      ' _____######___####_##############__######______ ',
      ' ____#######__#####################_#######_____ ',
      ' ____#######__##############################____ ',
      ' ___#######__######_#################_#######___ ',
      ' ___#######__######_######_#########___######___ ',
      ' ___#######____##__######___######_____######___ ',
      ' ___#######________######____#####_____#####____ ',
      ' ____######________#####_____#####_____####_____ ',
      ' _____#####________####______#####_____###______ ',
      ' ______#####______;###________###______#________ ',
      ' ________##_______####________####______________ ',
    ].join('\n'),
  );
}

/**
 * @description 是否dev
 */
export const isDev = import.meta.env.DEV;

/**
 * @description file转unit8Array
 * @param file
 * @returns
 */
export function fileToUnit8Array(
  file: File,
): Promise<Uint8Array> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      resolve(new Uint8Array(reader.result as ArrayBuffer));
    };
    reader.readAsArrayBuffer(file);
  });
}

/**
 * @description 显示文件大小,大于1000自动进位
 */
export function formatFileSize(size: number) {
  const unit = ['B', 'KB', 'MB', 'GB'];
  let index = 0;
  while (size >= 1000) {
    size /= 1000;
    index++;
  }
  return `${size.toFixed(2)}${unit[index]}`;
}

// 下划线转驼峰
export function toHump(name: string) {
  return name.replace(/\_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

// 展平对象数组
export function flattenObjectArray(
  arr: Record<string, any>[],
) {
  return arr.reduce((prev, curr) => {
    return {
      ...prev,
      ...curr,
    };
  }, {});
}

/**
 * @description 获取版本号
 */
export const VERSION = version;

/**
 * @description 下载unit8Array
 * @param arr
 * @param type
 * @param filename
 */
export function downloadUnit8Array(
  arr: Uint8Array,
  type: string,
  filename: string,
) {
  const blob = new Blob([arr], { type });
  downloadBlob(blob, filename);
}

/**
 * @description 下载blob
 */
export function downloadBlob(blob: Blob, filename: string) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

/**
 * @description 获取视频信息
 * @returns
 */
export async function getMediaInfo(file: File) {
  const { default: MediaInfo } = await import(
    'mediainfo.js'
  );
  const mediaInfo = await MediaInfo({
    format: 'object',
    locateFile: (path, prefix) => {
      if (path === 'MediaInfoModule.wasm') {
        return new URL(
          '../lib/mediaInfo/MediaInfoModule.wasm',
          import.meta.url,
        ).href;
      }
      return prefix + path;
    },
  });
  const result = (await mediaInfo.analyzeData(
    () => file.size,
    (chunkSize, offset) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => {
          if (event.target?.error) {
            reject(event.target.error);
          }
          resolve(
            new Uint8Array(
              event.target?.result as ArrayBuffer,
            ),
          );
        };
        reader.readAsArrayBuffer(
          file.slice(offset, offset + chunkSize),
        );
      }),
  )) as ResultObject;
  return result;
}
