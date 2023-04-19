<!--
 * @Author: zhicheng ran
 * @Date: 2023-03-27 15:38:33
 * @LastEditTime: 2023-04-19 17:08:23
 * @FilePath: \format-factory\src\views\Video\components\Transcoding.vue
 * @Description: 
-->
<script lang="ts" setup>
import {
  downloadUnit8Array,
  getFileNameWithoutExt,
  objToFFmpegCmd,
  Timer,
} from '@/utils';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import type { UploadUserFile } from 'element-plus';
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
import { CommonConfig } from '../type';

const props = defineProps<{
  encoder: FFmpeg | null;
  file: UploadUserFile;
  config: CommonConfig;
}>();
// 视频格式
const formats = [
  'mp4',
  'webm',
  'ogg',
  'avi',
  'mov',
  'flv',
  'wmv',
  'mkv',
  'm4v',
  '3gp',
  '3g2',
  'ts',
  'mts',
  'm2ts',
  'vob',
  'mxf',
  'f4v',
];
const config = reactive({
  format: 'mp4',
  kbps: 1000,
  frameRate: 60,
  width: 1920,
  height: 1080,
  resolution: 1080,
  black: false,
  preset: 'medium',
});
const percentageLoading = reactive({
  loading: false,
  percentage: 0,
  text: '',
  tip: '',
});

const preset = [
  {
    label: 'ultrafast',
    value: 'ultrafast',
  },
  {
    label: 'superfast',
    value: 'superfast',
  },
  {
    label: 'veryfast',
    value: 'veryfast',
  },
  {
    label: 'faster',
    value: 'faster',
  },
  {
    label: 'fast',
    value: 'fast',
  },
  {
    label: 'medium',
    value: 'medium',
  },
  {
    label: 'slow',
    value: 'slow',
  },
  {
    label: 'slower',
    value: 'slower',
  },
  {
    label: 'veryslow',
    value: 'veryslow',
  },
];

async function handleTranscoding() {
  try {
    const timer = new Timer(1000);
    timer.start(currentTime => {
      const time = Number(
        (
          (currentTime *
            (100 - percentageLoading.percentage)) /
          percentageLoading.percentage /
          1000
        ).toFixed(0),
      );
      percentageLoading.tip = `已耗时${
        currentTime / 1000
      }秒,预计还需${time}秒`;
    });
    percentageLoading.loading = true;
    console.log(
      '%c [ timer ]-106',
      'font-size:13px; background:pink; color:#bf2c9f;',
      timer,
    );

    props.encoder?.setProgress((progress: any) => {
      const { ratio } = progress;
      console.log(
        '%c [ progress ]-121',
        'font-size:13px; background:pink; color:#bf2c9f;',
        progress,
      );

      if (ratio >= 1 && !progress.duration) {
        timer.stop();
        percentageLoading.tip =
          '转码已完成,正在执行导出操作...';
      }
      const nowPercentage = Number(
        (ratio * 100).toFixed(1),
      );
      percentageLoading.percentage = nowPercentage;
    });
    const {
      format,
      frameRate,
      width,
      height,
      resolution,
      kbps,
      black,
      preset,
    } = config;
    const cmd = objToFFmpegCmd({
      // 输入视频文件
      '-i': props.file.name,
      // 帧率
      '-r': `${frameRate}`,
      // 宽高
      '-s': `${width}x${height}`,
      // 分辨率 视频分辨率（transsizing）的例子，从 1080p 转为 480p 。
      '-vf': `scale=${resolution}:-1${
        black ? '' : ' ,hue=s=0'
      }`,
      // 码率
      '-b': `${kbps}k`,
      // 黑白
      // 去除音频
      // '-an': '',
      // '-vf': 'hue=s=0',
      // 输出质量,指定输出的视频质量，会影响文件的生成速度
      '-preset': preset,
      //  ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow
    });
    const outputFileName = `${getFileNameWithoutExt(
      props.config.name,
    )}.${format.toLowerCase()}`;
    console.log(
      '%c [ config ]-70',
      'font-size:13px; background:pink; color:#bf2c9f;',
      config,
    );
    await props.encoder?.run(...cmd, outputFileName);
    const output = props.encoder?.FS(
      'readFile',
      outputFileName,
    );
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
  percentageLoading.loading = false;
  percentageLoading.tip = '';
}
</script>

<template>
  <div>
    <div class="config">
      <h2>转换配置:</h2>
      <el-form
        label-position="left"
        label-width="100px"
        :model="config"
      >
        <el-form-item label="输出格式">
          <el-select
            v-model="config.format"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in formats"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="码率">
          <el-input
            v-model="config.kbps"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="帧率">
          <el-input
            v-model="config.frameRate"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="宽">
          <el-input
            v-model="config.width"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="高">
          <el-input
            v-model="config.height"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="清晰度">
          <el-input
            v-model="config.resolution"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否黑白">
          <el-checkbox
            v-model="config.black"
            placeholder="请输入"
          ></el-checkbox>
        </el-form-item>
        <el-form-item label="输出速度">
          <template #label>
            <el-tooltip content="输出速度越快,质量越低">
              输出速度
            </el-tooltip>
          </template>
          <el-select
            v-model="config.preset"
            placeholder="请输入"
          >
            <el-option
              v-for="item in preset"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="operate">
      <el-button type="primary" @click="handleTranscoding">
        输出
      </el-button>
    </div>
    <progress-loading v-bind="percentageLoading" />
  </div>
</template>

<style scoped lang="less">
.operate {
  display: flex;
  justify-content: center;
}
</style>
