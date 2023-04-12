<!--
 * @Author: zhicheng ran
 * @Date: 2023-04-11 16:23:11
 * @LastEditTime: 2023-04-12 14:16:54
 * @FilePath: \format-factory\src\components\ProgressLoading.vue
 * @Description: 
-->
<script lang="ts" setup>
import { isNil } from '@/utils';
import { Check } from '@element-plus/icons-vue';
import { computed, ref, watch } from 'vue';
const props = defineProps<{
  loading: boolean;
  percentage?: number;
  text?: string;
  percentageLabel?: string;
  tip?: string;
}>();
const loadingRef = ref(false);
watch(
  () => props.loading,
  () => {
    if (props.loading) {
      loadingRef.value = true;
    } else {
      // 动画
    }
    setTimeout(() => {
      if (!props.loading) {
        loadingRef.value = false;
      } else {
        // 动画
      }
    }, 1000);
  },
  {
    immediate: true,
  },
);
const showProgress = computed(() => {
  return !isNil(props.percentage);
});
const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#6f7ad3', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#5cb87a', percentage: 100 },
];
</script>

<template>
  <div v-show="loadingRef" class="mask">
    <template v-if="showProgress">
      <el-progress
        type="dashboard"
        :percentage="percentage"
        :color="colors"
      >
        <!-- eslint-disable-next-line vue/no-template-shadow -->
        <template #default="{ percentage }">
          <span
            v-if="percentage < 100"
            class="percentage-value"
            >{{ percentage }}%</span
          >
          <el-button
            v-else
            type="success"
            :icon="Check"
            circle
          />
          <span
            v-if="percentageLabel"
            class="percentage-label"
            >{{ percentageLabel }}</span
          >
        </template>
      </el-progress>
      <div class="tip">{{ tip }}</div>
    </template>
    <template v-else>加载中</template>
  </div>
</template>

<style scoped lang="less">
.mask {
  transition: all 0.5s ease;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.enter {
}
.leave {
}
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
</style>
