/*
 * @Author: [susanforme]
 * @Date: 2023-02-04 11:16:04
 * @LastEditTime: 2023-05-09 15:01:44
 * @FilePath: \format-factory\scripts\util.ts
 * @Description:
 */

import * as fs from 'fs';
import * as path from 'path';
import db from '../assets/zh.json';
const enKeys = Object.keys(db);

/**
 * @description:  request limit queue
 */
export class RequestQueue {
  #queue: (() => Promise<any>)[] = [];
  #isProcessing = false;
  #maxRequestsPerSecond: number;
  #requestsThisSecond = 0;

  constructor(maxRequestsPerSecond: number) {
    this.#maxRequestsPerSecond = maxRequestsPerSecond;
  }
  public async addRequest(
    requests: (() => Promise<any>)[],
  ): Promise<any> {
    this.#queue.push(...requests);
    if (!this.#isProcessing) {
      this.#isProcessing = true;
      await this.#processQueue();
    }
  }

  async #processQueue(): Promise<void> {
    while (this.#queue.length > 0) {
      const request = this.#queue.shift();
      await request!();
      this.#requestsThisSecond++;
      if (
        this.#requestsThisSecond >=
        this.#maxRequestsPerSecond
      ) {
        await this.#sleep(1000);
        this.#requestsThisSecond = 0;
      }
    }
    this.#isProcessing = false;
  }

  #sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * @description write log
 * @param logText  log content
 * @param logName  log name
 */
export function writeLog(logText: string, logName = 'log') {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(__dirname, `../${logName}.log`),
      (err, data) => {
        fs.writeFile(
          path.resolve(__dirname, `../${logName}.log`),
          `${err ? '' : data.toString()} \n ${logText}`,
          { encoding: 'utf-8', flag: 'a' },
          err => {
            if (err) {
              console.log('write log failed');
              reject(err);
            } else {
              console.log('write log success');
              resolve(true);
            }
          },
        );
      },
    );
  });
}

/**
 * @description 对象组装
 * @param keys
 * @param values
 */
export function objectAssembly<T extends any>(
  keys: string[],
  values: T[],
) {
  const obj: Record<string, T> = {};
  keys.forEach((key, index) => {
    obj[key] = values[index];
  });
  return obj;
}
/**
 *
 * @param text  the text of translate
 * @param writePath the path of write file
 */
export async function writeTranslateJsonFile(
  texts: string[],
  filename: string,
  writePath: string,
) {
  const langPath = path.resolve(__dirname, writePath);
  const existedTexts = await readTranslateFile(
    filename,
    writePath,
  );
  const translateTexts = {
    ...objectAssembly(enKeys, texts),
    // 以已存在的翻译内容为主
    ...existedTexts,
  };

  const isSuccess = await new Promise<boolean>(resolve => {
    fs.writeFile(
      `${langPath}/${filename}.json`,
      JSON.stringify(translateTexts),
      err => {
        if (err) {
          console.log(err, 'writeFile error');
          resolve(false);
        } else {
          resolve(true);
        }
      },
    );
  });
  return isSuccess;
}

/**
 * @description 返回一个已经存在的翻译内容
 */
export function readTranslateFile(
  filename: string,
  writePath: string,
) {
  const langPath = path.resolve(__dirname, writePath);
  return new Promise<Record<string, any>>(resolve => {
    fs.readFile(
      `${langPath}/${filename}.json`,
      (err, data) => {
        if (err) {
          console.error(err);
          resolve({});
        } else {
          try {
            const text = JSON.parse(data.toString());
            resolve(text);
          } catch (error) {
            console.error(error);
            resolve({});
          }
        }
      },
    );
  });
}
