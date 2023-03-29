<!--
 * @Author: zhicheng ran
 * @Date: 2023-03-23 13:59:34
 * @LastEditTime: 2023-03-29 14:59:01
 * @FilePath: \format-factory\src\views\Video\Video.vue
 * @Description: 
-->
<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";

import {
  fileToUnit8Array,
  initFfmpeg,
  formatFileSize,
  parseFfmpegOutput,
} from "@/utils";
import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { fileList } from "@/store";
import Transcoding, {
  TranscodingConfigType,
} from "./components/Transcoding.vue";

let ffmpeg: FFmpeg | null = null;
let lastFileName = "";
const config = reactive({
  name: "output",
});

const activeName = ref("transcoding");
const info = ref<Record<string, any>>({});

const loading = reactive({
  value: false,
  text: "Loading",
});
const file = computed(() => fileList.value[0]);

async function initEncoder() {
  loading.value = true;
  loading.text = "初始化编解码器中...";
  ffmpeg = await initFfmpeg();
  // ffmpeg.setLogger(({ type, message }) => {
  //   // console.log(...args);
  // });
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
// https://blog.csdn.net/u011686167/article/details/120879467
// https://blog.csdn.net/fuhanghang/article/details/123565920
async function getInfo() {
  loading.value = true;
  loading.text = "获取视频信息中...";
  const origin = file.value;
  const unit8 = await fileToUnit8Array(origin.raw!);
  const outputs: string[] = [];

  ffmpeg?.FS("writeFile", origin.name, unit8);
  lastFileName = origin.name;
  ffmpeg?.setLogger(({ type, message }) => {
    if (type !== "ffout") {
      outputs.push(message);
    }
  });
  await ffmpeg?.run("-i", origin.name);
  console.log(parseFfmpegOutput(outputs));
  loading.value = false;
}
async function init() {
  console.log("初始化编码器");
  await initEncoder();
  await getInfo();
}

init();
function onTabClick() {}

function handleTranscoding(config: TranscodingConfigType) {
  console.log(
    "%c [ config ]-70",
    "font-size:13px; background:pink; color:#bf2c9f;",
    config
  );
}
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
        <div class="value">{{ formatFileSize(file.size!) }}</div>
      </div>
    </div>
    <div class="config">
      <h2>通用导出配置:</h2>
      <el-form label-position="left" label-width="100px" :model="config">
        <el-form-item label="输出名称">
          <el-input placeholder="请输入" v-model="config.name"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="operate">
      <el-tabs v-model="activeName" @tab-click="onTabClick">
        <el-tab-pane name="transcoding" label="转换">
          <Transcoding :on-finish="handleTranscoding" />
        </el-tab-pane>
        <el-tab-pane name="Config" label="提取字幕"></el-tab-pane>
        <!-- TODO:音频提取可直接转到Audio -->
        <el-tab-pane name="Role" label="提取音频"></el-tab-pane>
        <el-tab-pane name="waterMark" label="水印"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped lang="less">
.video {
}
.row {
  display: flex;
}
</style>
