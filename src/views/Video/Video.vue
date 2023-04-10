<!--
 * @Author: zhicheng ran
 * @Date: 2023-03-23 13:59:34
 * @LastEditTime: 2023-04-10 14:57:52
 * @FilePath: \format-factory\src\views\Video\Video.vue
 * @Description: 
-->
<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';
import InfoTable from '../../components/InfoTable.vue';

import { i18n } from '@/locales';
import { fileList } from '@/store';
import {
  formatFileSize,
  getMediaInfo,
  omit,
} from '@/utils';
import Transcoding, {
  TranscodingConfigType,
} from './components/Transcoding.vue';

const config = reactive({
  name: 'output',
});

const activeName = ref('transcoding');
const collapseActiveName = ref('-1');
const info = ref({
  audio: {},
  video: {
    code: '',
    format: '',
  },
  basic: {
    VideoCount: '',
    AudioCount: '',
    Format: '',
    Format_Profile: '',
    CodecID: '',
    CodecID_Compatible: '',
    FileSize: '',
    Duration: '',
    OverallBitRate_Mode: '',
    OverallBitRate: '',
    FrameRate: '',
    FrameCount: '',
    StreamSize: '',
    HeaderSize: '',
    DataSize: '',
    FooterSize: '',
    IsStreamable: '',
    Encoded_Application: '',
  },
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
  // ffmpeg.setLogger(({ type, message }) => {
  //   // console.log(...args);
  // });
  loading.value = false;
}

watch(
  file,
  () => {
    if (file.value) {
      getInfo();
    }
  },
  {
    immediate: true,
  },
);
// https://blog.csdn.net/u011686167/ar{ticle/details/120879467
// https://blog.csdn.net/fuhanghang/article/details/123565920
async function getInfo() {
  loading.value = true;
  loading.text = '获取视频信息中...';
  const result = await getMediaInfo(file.value.raw!);
  console.log(
    '%c [ result ]-68',
    'font-size:13px; background:pink; color:#bf2c9f;',
    result,
  );
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

  loading.value = false;
}
async function init() {
  console.log(123);
}

init();
function onTabClick() {
  console.log(123);
}
function handleTranscoding(config: TranscodingConfigType) {
  console.log(
    '%c [ config ]-70',
    'font-size:13px; background:pink; color:#bf2c9f;',
    config,
  );
}
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
