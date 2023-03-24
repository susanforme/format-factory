/**
 @description 初始化ffmpeg
 */
export async function initFfmpeg() {
  const { createFFmpeg } = await import("@ffmpeg/ffmpeg");
  const ffmpeg = createFFmpeg({
    log: true,
    progress: (p) => {
      console.log(p);
    }, //回调 展示进度
    // workerPath: new URL(
    //   "@ffmpeg/core/dist/ffmpeg-core.worker.js",
    //   import.meta.url
    // ).href,
    //TODO:  低版本报错 低版本手动构建 https://github.com/ffmpegwasm/ffmpeg.wasm/issues/137#issuecomment-1014956114
    ...(isDev
      ? {
          corePath: new URL("@ffmpeg/core/dist/ffmpeg-core.js", import.meta.url)
            .href,
        }
      : {}),
  });
  await ffmpeg.load();
  return ffmpeg;
}

export function log() {
  console.log(
    [
      " _______________#########_______________________ ",
      " ______________############_____________________ ",
      " ______________#############____________________ ",
      " _____________##__###########___________________ ",
      " ____________###__######_#####__________________ ",
      " ____________###_#######___####_________________ ",
      " ___________###__##########_####________________ ",
      " __________####__###########_####_______________ ",
      " ________#####___###########__#####_____________ ",
      " _______######___###_########___#####___________ ",
      " _______#####___###___########___######_________ ",
      " ______######___###__###########___######_______ ",
      " _____######___####_##############__######______ ",
      " ____#######__#####################_#######_____ ",
      " ____#######__##############################____ ",
      " ___#######__######_#################_#######___ ",
      " ___#######__######_######_#########___######___ ",
      " ___#######____##__######___######_____######___ ",
      " ___#######________######____#####_____#####____ ",
      " ____######________#####_____#####_____####_____ ",
      " _____#####________####______#####_____###______ ",
      " ______#####______;###________###______#________ ",
      " ________##_______####________####______________ ",
    ].join("\n")
  );
}

export const isDev = import.meta.env.DEV;

export function fileToUnit8Array(file: File): Promise<Uint8Array> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(new Uint8Array(reader.result as ArrayBuffer));
    };
    reader.readAsArrayBuffer(file);
  });
}
