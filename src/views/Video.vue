<!--
 * @Author: zhicheng ran
 * @Date: 2023-03-23 13:59:34
 * @LastEditTime: 2023-03-23 16:08:23
 * @FilePath: \format-factory\src\views\Video.vue
 * @Description: 
-->
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { initFfmpeg } from "../utils";
import type { FFmpeg } from "@ffmpeg/ffmpeg";

let ffmpeg: FFmpeg | null = null;
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
  ></div>
</template>

<style scoped lang="less">
.video {
}
</style>
