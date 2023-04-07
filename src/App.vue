<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue';
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
} from 'element-plus';
import { genFileId } from 'element-plus';
import UAParser from 'ua-parser-js';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { fileList } from './store';

const upload = ref<UploadInstance>();
const route = useRoute();
const accept = computed(() => {
  if (route.path === '/video') {
    return 'video/*';
  } else if (route.path === '/picture') {
    return 'audio/*';
  }
  return '';
});

const collapseActiveName = ref('1');

watch(
  () => route.path,
  () => {
    fileList.value = [];
  },
);

const handleExceed: UploadProps['onExceed'] = files => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const ua = new UAParser(
  window.navigator.userAgent,
).getResult();

const basicInfo = computed(() => ({
  browser: `${ua.browser.name} ${ua.browser.version} `,
  os: `${ua.os.name} ${ua.os.version}`,
  cpu: `${ua.cpu.architecture}`,
}));
</script>

<template>
  <div id="content">
    <Header></Header>
    <main>
      <div class="main">
        <div class="file">
          <!-- TODO: 队列 -->
          <el-collapse v-model="collapseActiveName">
            <el-collapse-item title="基本信息" name="1">
              <info-table :data="basicInfo" />
            </el-collapse-item>
          </el-collapse>

          <el-upload
            ref="upload"
            v-model:file-list="fileList"
            multiple
            drag
            :limit="1"
            :auto-upload="false"
            :on-exceed="handleExceed"
            :show-file-list="false"
            :accept="accept"
          >
            <el-icon class="el-icon--upload"
              ><upload-filled
            /></el-icon>
            <div class="el-upload__text">
              {{ $t('upload_tip_pre') }}
              <em>{{ $t('upload_tip_t') }}</em>
            </div>
          </el-upload>
        </div>
        <template v-if="fileList.length === 0">
          <el-empty :description="$t('empty_tip')" />
        </template>
        <template v-else>
          <router-view></router-view>
        </template>
      </div>
    </main>
  </div>
</template>

<style lang="less" scoped>
#content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > main {
    width: 100%;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    .main {
      width: 80%;
    }
  }
}
header {
  width: 100%;

  .header {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
}
</style>
