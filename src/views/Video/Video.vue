<!--
 * @Author: zhicheng ran
 * @Date: 2023-03-23 13:59:34
 * @LastEditTime: 2023-04-04 16:00:34
 * @FilePath: \format-factory\src\views\Video\Video.vue
 * @Description: 
-->
<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';

import { fileList } from '@/store';
import { formatFileSize, getMediaInfo } from '@/utils';
import Transcoding, {
  TranscodingConfigType,
} from './components/Transcoding.vue';

const config = reactive({
  name: 'output',
});

const activeName = ref('transcoding');
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
        code: track.CodecID,
        format: track.Format,
      };
    } else if (type === 'Audio') {
      info.value.audio = {
        code: track.CodecID,
        format: track.Format,
      };
    } else if (type === 'General') {
      info.value.basic = track;
    }
  });

  loading.value = false;
}
async function init() {}

init();
function onTabClick() {}

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
        <div class="value">
          {{ formatFileSize(file.size!) }}
        </div>
      </div>
      <div class="row">
        <div class="label">格式:</div>
        <div class="value">
          {{ info?.basic?.Format }}
        </div>
      </div>
      <div class="row">
        <div class="label">格式配置文件:</div>
        <div class="value">
          {{ info?.basic?.Format_Profile }}
        </div>
      </div>
      <div class="row">
        <div class="label">总比特率:</div>
        <div class="value">
          {{ info?.basic?.OverallBitRate }}
        </div>
      </div>
      <div class="row">
        <div class="label">帧率:</div>
        <div class="value">
          {{ info?.basic?.FrameRate }}
        </div>
      </div>
      <div class="row">
        <div class="label">帧数:</div>
        <div class="value">
          {{ info?.basic?.FrameCount }}
        </div>
      </div>
      <div class="row">
        <div class="label">视频时长:</div>
        <div class="value">{{ info?.basic?.Duration }}</div>
      </div>
      <div class="row">
        <div class="label">解码器:</div>
        <div class="value">
          {{ info?.basic?.Encoded_Application }}
        </div>
      </div>

      <div class="row">
        <div class="label">
          <el-tooltip content="详见 http://ftyps.com/">
            ftyp:
          </el-tooltip>
        </div>
        <div class="value">
          {{ info?.basic?.CodecID }}
        </div>
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
      <el-form
        label-position="left"
        label-width="100px"
        :model="config"
      >
        <el-form-item label="输出名称">
          <el-input
            placeholder="请输入"
            v-model="config.name"
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
