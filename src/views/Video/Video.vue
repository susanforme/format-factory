<!--
 * @Author: zhicheng ran
 * @Date: 2023-03-23 13:59:34
 * @LastEditTime: 2023-04-10 17:05:35
 * @FilePath: \format-factory\src\views\Video\Video.vue
 * @Description: 
-->
<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';
// https://blog.csdn.net/u011686167/article/details/120879467
import InfoTable from '../../components/InfoTable.vue';

import { i18n } from '@/locales';

import { fileList } from '@/store';

import {
  downloadUnit8Array,
  ensure,
  fileToUnit8Array,
  formatFileSize,
  getFileNameWithoutExt,
  getMediaInfo,
  initFfmpeg,
  objToFFmpegCmd,
  omit,
} from '@/utils';

import { FFmpeg } from '@ffmpeg/ffmpeg';

import { ElMessage } from 'element-plus';

import Transcoding, {
  TranscodingConfigType,
} from './components/Transcoding.vue';

const config = reactive({
  name: 'output',
});
let ffmpeg: FFmpeg | null = null;

const activeName = ref('transcoding');
const collapseActiveName = ref('-1');
const info = ref({
  audio: {},
  video: {},
  basic: {},
});

const basicInfo = computed(() => ({
  file_n: file.value.name,
  file_s: formatFileSize(file.value.size!),
  ...info.value.basic,
}));

const loading = reactive({
  value: false,
  text: 'Loading',
});
const file = computed(() => fileList.value[0]);

async function initEncoder() {
  loading.value = true;
  loading.text = '初始化编解码器中...';
  ffmpeg = await initFfmpeg();
  ffmpeg.setLogger(({ type, message }) => {
    console.log(type, message);
  });
  loading.value = false;
}

watch(
  file,
  async () => {
    if (file.value) {
      await getInfo();
      await writeFileInFfmpeg();
    }
  },
  {
    immediate: true,
  },
);

async function writeFileInFfmpeg() {
  loading.value = true;
  loading.text = '正在读取文件...';
  const uni8 = await fileToUnit8Array(file.value.raw!);
  ffmpeg?.FS('writeFile', file.value.name, uni8);
  console.log('视频已读入ffmpeg');
  loading.value = false;
}
// https://blog.csdn.net/fuhanghang/article/details/123565920
async function getInfo() {
  loading.value = true;
  loading.text = '获取视频信息中...';
  const result = await getMediaInfo(file.value.raw!);
  result.media.track.forEach((track: any) => {
    const type = track['@type'];
    if (type === 'Video') {
      info.value.video = {
        ...(omit(track, ['FileSize', 'DataSize']) as any),
        '@type': i18n.global.t('video'),
      };
    } else if (type === 'Audio') {
      info.value.audio = {
        ...(omit(track, ['FileSize', 'DataSize']) as any),
        '@type': i18n.global.t('audio'),
      };
    } else if (type === 'General') {
      info.value.basic = omit(track, [
        'FileSize',
        'DataSize',
      ]) as any;
    }
  });
  await ensure(() => !!ffmpeg);
  loading.value = false;
}
async function init() {
  await initEncoder();
}

function onTabClick() {
  console.log(123);
}
async function handleTranscoding(
  config: TranscodingConfigType,
) {
  try {
    const { format, frameRate } = config;
    const cmd = objToFFmpegCmd({
      // 输入视频文件
      '-i': file.value.name,
      // 帧率
      '-r': `${frameRate}`,
      // 宽高
      '-s': '1920x1080',
      // 分辨率 视频分辨率（transsizing）的例子，从 1080p 转为 480p 。
      // '-vf':'scale=480:-1',
      // 码率
      '-b': '1000k',
      // 黑白
      '-vf': 'hue=s=0',
      // 去除音频
      '-an': '',
      // 输出质量,指定输出的视频质量，会影响文件的生成速度
      '-preset': '1',
      //  ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow
    });
    const outputFileName = `${getFileNameWithoutExt(
      file.value.name,
    )}.${format.toLowerCase()}`;
    console.log(
      '%c [ config ]-70',
      'font-size:13px; background:pink; color:#bf2c9f;',
      config,
    );
    await ffmpeg?.run(...cmd, outputFileName);
    const output = ffmpeg?.FS('readFile', outputFileName);
    if (!output) {
      throw new Error('转换失败');
    }
    downloadUnit8Array(output, 'video/mp4', outputFileName);
  } catch (error: any) {
    console.log(
      '%c [ error ]-156',
      'font-size:13px; background:pink; color:#bf2c9f;',
      error,
    );
    ElMessage({
      message: '转换失败',
      type: 'error',
    });
  }
}

init();
</script>

<template>
  <div
    v-loading="loading.value"
    class="video"
    :element-loading-text="loading.text"
  >
    <el-collapse v-model="collapseActiveName">
      <el-collapse-item title="基本信息" name="1">
        <info-table :data="basicInfo" />
      </el-collapse-item>
      <el-collapse-item title="视频流信息" name="2">
        <info-table :data="info.video" />
      </el-collapse-item>
      <el-collapse-item title="音频流信息" name="3">
        <info-table :data="info.audio" />
      </el-collapse-item>
    </el-collapse>
    <!-- <div class="row">
        <div class="label">
          <el-tooltip content="详见 http://ftyps.com/">
            ftyp:
          </el-tooltip>
        </div>
        <div class="value">
          {{ info?.basic?.CodecID }}
        </div>
      </div> -->

    <div class="config">
      <h2>通用导出配置:</h2>
      <el-form
        label-position="left"
        label-width="100px"
        :model="config"
      >
        <el-form-item label="输出名称">
          <el-input
            v-model="config.name"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="operate">
      <el-tabs v-model="activeName" @tab-click="onTabClick">
        <el-tab-pane name="transcoding" label="转换">
          <Transcoding :on-finish="handleTranscoding" />
        </el-tab-pane>
        <el-tab-pane
          name="Config"
          label="提取字幕"
        ></el-tab-pane>
        <!-- TODO:音频提取可直接转到Audio -->
        <el-tab-pane
          name="Role"
          label="提取音频"
        ></el-tab-pane>
        <el-tab-pane
          name="waterMark"
          label="水印"
        ></el-tab-pane>
        <el-tab-pane
          name="screenshot"
          label="截图"
        ></el-tab-pane>
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
