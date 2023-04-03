<!--
 * @Author: zhicheng ran
 * @Date: 2023-03-23 13:59:34
 * @LastEditTime: 2023-04-03 15:27:37
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
  downloadUnit8Array,
} from "@/utils";
import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { fileList } from "@/store";
import Transcoding, {
  TranscodingConfigType,
} from "./components/Transcoding.vue";
import { ElNotification } from "element-plus";

let ffmpeg: FFmpeg | null = null;
let lastFileName = "";
const config = reactive({
  name: "output",
});

const activeName = ref("transcoding");
const info = ref({
  audio: {},
  video: {
    code: "",
    format: "",
  },
  basic: {
    duration: 0,
    bitrate: 0,
    encoder: "",
    majorBrand: "",
  },
});

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
  ffmpeg?.setProgress((t) => {
    console.log(
      "%c [ t ]-82",
      "font-size:13px; background:pink; color:#bf2c9f;",
      t
    );
  });
  await ffmpeg?.run(
    "-i",
    origin.name,
    "-f",
    "ffmetadata",
    "-c",
    "copy",
    "-map_metadata",
    "0",
    "-map_metadata:s:v",
    "0:s:v",
    // "-map_metadata:s:a 0:s:a",
    "FFMETADATAFILE"
  );
  const data = ffmpeg?.FS("readFile", "FFMETADATAFILE");
  downloadUnit8Array(
    data!,
    `
  text/plain;charset=utf-8
  `,
    "t.txt"
  );
  const outputsInfo = parseFfmpegOutput(outputs);
  console.log(outputsInfo);
  if (outputsInfo.length === 0) {
    ElNotification.error({
      title: "错误",
      message: "获取视频信息失败",
    });
  } else {
    ElNotification.success({
      title: "成功",
      message: "获取视频信息成功",
    });
    const { duration: d, encoder, majorBrand } = outputsInfo[0] ?? {};
    const { duration, bitrate } = d ?? {};
    info.value.basic = {
      duration,
      bitrate,
      encoder,
      majorBrand,
    };
    const videoInfo = outputsInfo.find(
      (v) => v?.handlerName === "videohandler"
    );
    if (videoInfo) {
    } else {
      ElNotification.error({
        title: "错误",
        message: "获取视频流信息失败",
      });
    }
    const audioInfo = outputsInfo.find(
      (v) => v?.handlerName === "soundhandler"
    );
  }
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
      <h2>基本信息:</h2>
      <div class="row">
        <div class="label">文件名:</div>
        <div class="value">{{ file.name }}</div>
      </div>
      <div class="row">
        <div class="label">文件大小:</div>
        <div class="value">{{ formatFileSize(file.size!) }}</div>
      </div>
      <div class="row">
        <div class="label">视频时长:</div>
        <div class="value">{{ info?.basic?.duration }}</div>
      </div>
      <div class="row">
        <div class="label">解码器:</div>
        <div class="value">{{ info?.basic?.encoder }}</div>
      </div>
      <div class="row">
        <div class="label">
          <el-tooltip content="详见 http://ftyps.com/"> ftyp: </el-tooltip>
        </div>
        <div class="value">{{ info?.basic?.majorBrand }}</div>
      </div>
    </div>
    <div class="info">
      <h2>视频流信息:</h2>
      <div class="row">
        <div class="label">文件名:</div>
        <div class="value">{{ file.name }}</div>
      </div>
    </div>
    <div class="info">
      <h2>音频流信息:</h2>
      <div class="row">
        <div class="label">文件名:</div>
        <div class="value">{{ file.name }}</div>
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
