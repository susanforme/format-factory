<!--
 * @Author: zhicheng ran
 * @Date: 2023-03-23 13:59:34
 * @LastEditTime: 2023-03-24 15:48:15
 * @FilePath: \format-factory\src\views\Video.vue
 * @Description: 
-->
<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import { fileToUnit8Array, initFfmpeg } from "../utils";
import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { fileList } from "@/store";

let ffmpeg: FFmpeg | null = null;
let lastFileName = "";
const config = reactive({
  format: "mp4",
  name: "output",
  kbps: 1000,
});
const info = ref<Record<string, any>>({});

// 视频格式
const formats = [
  "mp4",
  "webm",
  "ogg",
  "avi",
  "mov",
  "flv",
  "wmv",
  "mkv",
  "m4v",
  "3gp",
  "3g2",
  "ts",
  "mts",
  "m2ts",
  "vob",
  "mxf",
  "rm",
  "rmvb",
  "f4v",
];
const loading = reactive({
  value: false,
  text: "Loading",
});
const file = computed(() => fileList.value[0]);

async function initEncoder() {
  loading.value = true;
  loading.text = "初始化编解码器中...";
  ffmpeg = await initFfmpeg();
  ffmpeg.setLogger((...args) => {
    console.log(...args);
  });
  loading.value = false;
}

watch(file, async () => {
  if (file.value) {
    if (lastFileName) {
      ffmpeg?.FS("unlink", lastFileName);
    }
    await getInfo();
  }
});

async function getInfo() {
  loading.value = true;
  loading.text = "获取视频信息中...";
  const origin = file.value;
  const unit8 = await fileToUnit8Array(origin.raw!);
  ffmpeg?.FS("writeFile", origin.name, unit8);
  lastFileName = origin.name;
  await ffmpeg?.run("-i", origin.name);
  loading.value = false;
}
async function init() {
  console.log("初始化编码器");
  await initEncoder();
  await getInfo();
}

init();
</script>

<template>
  <div
    class="video"
    v-loading="loading.value"
    :element-loading-text="loading.text"
  >
    <div class="info">
      <h2>视频信息:</h2>
      <div class="row">
        <div class="label">文件名:</div>
        <div class="value">{{ file.name }}</div>
      </div>
      <div class="row">
        <div class="label">文件大小:</div>
        <div class="value">{{ file.size }}B</div>
      </div>
    </div>
    <div class="config">
      <h2>配置:</h2>
      <el-form label-width="100px" :model="config">
        <el-form-item label="输出格式">
          <el-select filterable v-model="config.format" placeholder="请选择">
            <el-option
              v-for="item in formats"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="输出名称">
          <el-input placeholder="请输入" v-model="config.name"></el-input>
        </el-form-item>
        <el-form-item label="码率">
          <el-input placeholder="请输入" v-model="config.kbps"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="less">
.video {
}
</style>
