<!--
 * @Author: zhicheng ran
 * @Date: 2023-03-23 13:59:34
 * @LastEditTime: 2023-03-23 14:30:15
 * @FilePath: \format-factory\src\views\Video.vue
 * @Description: 
-->
<script lang="ts" setup>
import { reactive } from "vue";
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
  <div v-loading="loading.value" :element-loading-text="loading.text">123</div>
</template>

<style scoped lang="less"></style>
