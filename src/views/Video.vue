<!--
 * @Author: zhicheng ran
 * @Date: 2023-03-23 13:59:34
 * @LastEditTime: 2023-03-23 17:08:09
 * @FilePath: \format-factory\src\views\Video.vue
 * @Description: 
-->
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { initFfmpeg } from "../utils";
import type { FFmpeg } from "@ffmpeg/ffmpeg";

let ffmpeg: FFmpeg | null = null;
const config = reactive({
  format: "mp4",
  name: "output",
});

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

async function init() {
  loading.value = true;
  loading.text = "初始化编解码器中...";
  ffmpeg = await initFfmpeg();
  loading.value = false;
}

init();
</script>

<template>
  <div
    class="video"
    v-loading="loading.value"
    :element-loading-text="loading.text"
  >
    <div class="config">
      <h2>配置:</h2>
      <el-form label-width="100px" :model="config">
        <el-form-item label="输出格式">
          <el-select placeholder="请选择">
            <el-option
              v-model="config.format"
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
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="less">
.video {
}
</style>
