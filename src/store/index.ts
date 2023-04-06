/*
 * @Author: zhicheng ran
 * @Date: 2023-03-23 15:24:46
 * @LastEditTime: 2023-04-06 15:42:11
 * @FilePath: \format-factory\src\store\index.ts
 * @Description:
 */
import type { UploadUserFile } from 'element-plus';
import { Language } from 'element-plus/es/locale';
import en from 'element-plus/es/locale/lang/en';
import { ref } from 'vue';

export const fileList = ref<UploadUserFile[]>([]);

export const locale = ref<Language>(en);
