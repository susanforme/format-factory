/*
 @Author: zhicheng ran
 @Date: 2023-03-23 14:21:14
 * @LastEditTime: 2023-03-24 14:30:31
 * @FilePath: \format-factory\src\utils\index.ts
 @Description:
 */

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