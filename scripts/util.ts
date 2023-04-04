/*
 * @Author: [susanforme]
 * @Date: 2023-02-04 11:16:04
 * @LastEditTime: 2023-04-04 16:07:46
 * @FilePath: \format-factory\scripts\util.ts
 * @Description:
 */

import * as fs from 'fs';
import { RateLimiter } from 'limiter';
import * as path from 'path';

/**
 * @description:  request limit queue
 */
export class RequestLimitsQueue<T extends any> {
  /** request limit */
  protected limit: number;
  /** request execution queue */
  protected executionQueue: Promise<T>[] = [];
  /** protected requestQueue */
  protected requestQueue: (() => Promise<T>)[] = [];
  /** protected result */
  protected results: {
    data: T;
    index: number;
  }[] = [];
  /** The number of pushed requests */
  protected pushedExecutionQueueCount = 0;
  /** protected resolve callback   */
  protected resolve: (value: T[]) => void = () => {};
  /**
   * because of array  splice method will trigger the set trap
   * so we need to use spliceTrapCount to avoid the callback function being called multiple times
   */
  protected spliceTrapCount = 0;
  /**
   *
   * @param limit request limit
   * @param initQueue init request queue
   * @param callback callback function
   * @param requestQueue request queue
   *
   */
  constructor(
    limit: number,
    requestQueue: (() => Promise<T>)[] = [],
    initQueue?: Promise<T>[],
  ) {
    if (initQueue && initQueue?.length > limit) {
      throw new Error(
        'initQueue length must be less than limit',
      );
    }
    this.limit = limit;
    this.requestQueue = requestQueue;
    // init queue
    this.executionQueue = this.reactive(
      this.addQueueListener(initQueue ?? []),
    );
  }
  init() {
    // if the request queue less than the limit, we need to add the request queue to the execution queue
    while (
      this.executionQueue.length < this.limit &&
      this.requestQueue.length > 0
    ) {
      this.requestToExecutionQueue();
    }
  }
  /**
   * @description return results of all request execution,and the order is the same as the request queue
   */
  run() {
    this.init();
    return new Promise<T[]>(resolve => {
      this.resolve = resolve;
    });
  }
  protected addQueueListener(queue: Promise<T>[]) {
    return queue.map(promise => {
      const index = this.pushedExecutionQueueCount++;
      const newPromise = promise.then(result => {
        this.results.push({
          data: result,
          index,
        });
        this.executionQueue.splice(
          this.executionQueue.findIndex(
            item => item === newPromise,
          ),
          1,
        );
        return result;
      });
      return newPromise;
    });
  }

  protected requestToExecutionQueue() {
    // if the request queue is empty, we need to return
    if (this.requestQueue.length === 0) {
      return;
    }
    this.executionQueue.push(
      ...this.addQueueListener([
        this.requestQueue.shift()!(),
      ]),
    );
  }
  protected reactive(origin: any) {
    return new Proxy(origin, {
      get: (target, key) => {
        return Reflect.get(target, key);
      },
      set: (target, key, value) => {
        if (key === 'length') {
          /**
           * if the queue length is less than the previous, it means that the queue is reduced
           * then we need to execute request and  add  to the new queue
           */
          if (
            this.requestQueue.length > 0 &&
            target[key] > value
          ) {
            this.requestToExecutionQueue();
            // if the queue length is 0, it means that the all request has been executed
          } else if (
            value === 0 &&
            this.requestQueue.length === 0
          ) {
            this.spliceTrapCount++;
            if (this.spliceTrapCount > 1) {
              console.log('all request has been executed!');
              this.results.sort(
                (a, b) => a.index - b.index,
              );
              this.resolve(
                this.results.map(v => {
                  return v.data;
                }),
              );
            }
          }
        }
        target[key] = value;
        return true;
      },
    });
  }
}

export class RequestTimeLimitsQueue<
  T extends any,
> extends RequestLimitsQueue<T> {
  /**per limit time */
  private timeLimits: number;
  /**limiter */
  private limiter: RateLimiter;
  private lastTimeLimits: number;
  constructor(
    limit: number,
    time: number,
    requestQueue: (() => Promise<T>)[] = [],
    initQueue?: Promise<T>[],
  ) {
    super(limit, requestQueue, initQueue);
    this.timeLimits = time;
    this.limiter = new RateLimiter({
      interval: this.timeLimits,
      tokensPerInterval: this.limit,
    });
    this.lastTimeLimits = this.timeLimits;
  }
  protected requestToExecutionQueue() {
    // if the request queue is empty, we need to return
    if (this.requestQueue.length === 0) {
      return;
    }
    const execute = () => {
      this.executionQueue.push(
        ...this.addQueueListener([
          this.requestQueue.shift()!(),
        ]),
      );
    };
    // if the current request count is less than the limit, we need to execute the request
    if (this.limiter.tryRemoveTokens(1)) {
      execute();
    } else {
      setTimeout(() => {
        this.requestToExecutionQueue();
      }, this.lastTimeLimits);
      //TODO: the first time is not accurate 满足limit再跳转limit时间
      this.lastTimeLimits += this.timeLimits;
    }
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
