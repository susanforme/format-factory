import * as dotenv from 'dotenv';
import * as tencentcloud from 'tencentcloud-sdk-nodejs';
import type { TextTranslateBatchRequest } from 'tencentcloud-sdk-nodejs/tencentcloud/services/tmt/v20180321/tmt_models';
import db from '../assets/zh.json';
import {
  LANGUAGE_CODE,
  LANGUAGE_CODE_ENTITY,
} from '../src/constants';
import {
  RequestQueue,
  writeTranslateJsonFile,
} from './util';

const credential = dotenv.config().parsed;

if (!credential) {
  throw new Error('.env not found');
}

const translateClient =
  new tencentcloud.tmt.v20180321.Client({
    credential: {
      secretId: credential!.SECRET_ID,
      secretKey: credential!.SECRET_KEY,
    },
    region: 'ap-chengdu',
  });

const langPath = '../src/locales/lang';
const enDesc = Object.values(db);
// write all translate  file
const requestQueue = Object.keys(LANGUAGE_CODE_ENTITY).map(
  key => {
    return async () => {
      const texts = await translateTexts(
        enDesc,
        LANGUAGE_CODE[key],
      );
      console.log(`translate ${key} success`);
      return writeTranslateJsonFile(texts, key, langPath);
    };
  },
);
const queue = new RequestQueue(5);
queue.addRequest(requestQueue);
console.log('translate success');

/**
 *
 * @param texts the text to be translated
 * @returns the translated text
 */
async function translateTexts(
  texts: string[],
  targetLanguage: LANGUAGE_CODE,
) {
  // if the target language is english, return the original text
  if (targetLanguage === 'zh-CN') {
    return texts;
  }
  let curTotalSize = 0,
    sliceIndex = 0;
  const chunks: string[][] = [];
  const translateTexts: Promise<string[]>[] = [];
  for (let i = 0; i < texts.length; i++) {
    const element = texts[i];
    curTotalSize += element.length;
    // 2000 is the limit of tencent translate api
    if (curTotalSize > 2000 || i === texts.length - 1) {
      if (i === sliceIndex) {
        throw new Error(
          `the  item ${i}  text is too long to not be translated`,
        );
      }
      chunks.push(texts.slice(sliceIndex, i));
      sliceIndex = i;
      curTotalSize = 0;
      break;
    }
  }

  for (const chunk of chunks) {
    const params: TextTranslateBatchRequest = {
      Source: 'auto',
      Target:
        //@ts-ignore 错误的提示
        targetLanguage === 'zh-CN' ? 'zh' : targetLanguage,
      SourceTextList: chunk,
      ProjectId: 0,
    };
    // put part of the text to translate
    translateTexts.push(
      translateClient.TextTranslateBatch(params).then(r => {
        return r.TargetTextList;
      }),
    );
  }
  const res = await Promise.all(translateTexts);
  return res.flat(Infinity) as string[];
}
