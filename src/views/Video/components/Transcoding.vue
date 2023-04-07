<!--
 * @Author: zhicheng ran
 * @Date: 2023-03-27 15:38:33
 * @LastEditTime: 2023-03-27 16:05:51
 * @FilePath: \format-factory\src\views\Video\components\Transcoding.vue
 * @Description: 
-->
<script lang="ts" setup>
import { reactive } from 'vue';
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
  'rm',
  'rmvb',
  'f4v',
];
const config = reactive({
  format: 'mp4',
  kbps: 1000,
});

const props = defineProps<{
  onFinish: (outputConfig: TranscodingConfigType) => any;
}>();

function handleFinish() {
  props.onFinish(config);
}
</script>
<script lang="ts">
export type TranscodingConfigType = {
  format: string;
  kbps: number;
};
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
      </el-form>
    </div>
    <div class="operate">
      <el-button type="primary" @click="handleFinish">
        输出
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
