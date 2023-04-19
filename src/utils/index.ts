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
    reader.onload = () => {
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

/**
 * @param keys 排除的key
 * @description 排除对象中的某些key
 */
export function omit<
  T extends Record<string, any>,
  K extends keyof T,
>(obj: T, keys: K[]) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key]) => !keys.includes(key as K),
    ),
  ) as Omit<T, K>;
}
/**
 * @param keys 取key
 * @description 取对象中的某些key
 */
export function pick<
  T extends Record<string, any>,
  K extends keyof T,
>(obj: T, keys: K[]) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) =>
      keys.includes(key as K),
    ),
  ) as Pick<T, K>;
}

/**
 * @description 清除对象中值为null和undefined

 */
export function clearObjectValue<
  T extends Record<string, any>,
>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value != null,
    ),
  ) as T;
}

/**
 * 确保值存在,才会进行下一步
 */
export function ensure(getRes: () => boolean, time = 100) {
  const res = getRes();
  return new Promise((resolve, rej) => {
    try {
      if (!res) {
        setTimeout(() => {
          ensure(getRes, time)
            .then(v => resolve(v))
            .catch(e => rej(e));
        }, time);
      } else {
        resolve(true);
      }
    } catch (error) {
      rej(error);
    }
  });
}

/**
 * @description obj,key value 转arr
 */
export function objToArr<T extends Record<string, any>>(
  obj: T,
): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj) as Array<
    [keyof T, T[keyof T]]
  >;
}

/**
 * @description 展平数组
 */

export function flatten<T>(arr: any[]) {
  return arr.flat(Infinity) as T[];
}

/**
 * @description 将对象转换为ffmpeg的命令
 */
export function objToFFmpegCmd(
  obj: Record<string, string>,
) {
  const arr = flatten<string>(
    objToArr(clearObjectValue(obj)),
  );
  return arr;
}

/**
 * @description 获取除开后缀的文件名
 */
export function getFileNameWithoutExt(filename: string) {
  return filename.replace(/\.[^/.]+$/, '');
}

/**
 * @description 获取可用编码
 */
export function getCodecs(ffmpeg: FFmpeg) {
  return ffmpeg.run('-codecs');
}

/**
 * @description 判断值是否为null或undefined
 */
export function isNil(value: any) {
  return (
    Object.is(value, null) || Object.is(value, undefined)
  );
}

/**
 * @description 计时器
 */
export class Timer {
  #timer: any;
  #time = 0;
  timeout: number;
  constructor(timeout: number) {
    this.#time = 0;
    this.timeout = timeout;
  }
  start(fn: (time: number) => any) {
    this.#timer = setInterval(() => {
      this.#time += this.timeout;
      fn(this.#time);
    }, this.timeout);
  }
  stop() {
    clearInterval(this.#timer);
    this.#time = 0;
    this.#timer = null;
  }
}
