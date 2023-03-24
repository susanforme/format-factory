/*
 * @Author: zhicheng ran
 * @Date: 2023-03-23 15:24:46
 * @LastEditTime: 2023-03-24 14:15:58
 * @FilePath: \format-factory\src\store\index.ts
 * @Description:
 */
import type { UploadUserFile } from "element-plus";
import { ref } from "vue";

export const fileList = ref<UploadUserFile[]>([]);
