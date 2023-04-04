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
import { useRoute, useRouter } from 'vue-router';
import { fileList } from './store';

const upload = ref<UploadInstance>();
const route = useRoute();

const accept = computed(() => {
  if (route.path === '/video') {
    return 'video/*';
  } else if (route.path === '/picture') {
    return 'audio/*';
  }
});

watch(
  () => route.path,
  path => {
    fileList.value = [];
  },
);

const handleExceed: UploadProps['onExceed'] = files => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};
const router = useRouter();
const routes = router.getRoutes().filter(route => {
  return route.redirect === undefined;
});
const ua = new UAParser(
  window.navigator.userAgent,
).getResult();
</script>

<template>
  <div id="content">
    <header>
      <div class="header">
        <div
          v-for="route in routes"
          :key="route.path"
          class="link"
        >
          <router-link :to="route.path">
            {{ route.meta.title }}
          </router-link>
        </div>
      </div>
    </header>
    <main>
      <div class="main">
        <div class="file">
          <!-- TODO: 队列 -->
          <div class="info">
            <h2>系统信息:</h2>
            <p>
              浏览器: {{ ua.browser.name }}
              {{ ua.browser.version }}
            </p>
            <p>
              操作系统: {{ ua.os.name }}
              {{ ua.os.version }}
            </p>
            <p>
              cpu:
              {{ ua.cpu.architecture }}
            </p>
          </div>
          <el-upload
            v-model:file-list="fileList"
            multiple
            drag
            ref="upload"
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
              将文件拖到此处 或 <em>点击选择</em>
            </div>
          </el-upload>
        </div>
        <template v-if="fileList.length === 0">
          <el-empty description="请先选择文件" />
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
