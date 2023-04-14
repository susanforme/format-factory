/*
 * @Author: [susanforme]
 * @Date: 2023-02-04 11:16:04
 * @LastEditTime: 2023-04-14 11:08:57
 * @FilePath: \format-factory\scripts\util.ts
 * @Description:
 */

import * as fs from 'fs';
import * as path from 'path';

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
