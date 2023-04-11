<!--
 * @Author: zhicheng ran
 * @Date: 2023-04-11 16:23:11
 * @LastEditTime: 2023-04-11 16:51:23
 * @FilePath: \format-factory\src\components\ProgressLoading.vue
 * @Description: 
-->
<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps<{
  loading: boolean;
  percentage?: number;
  text?: string;
}>();
const loading = ref(false);
watch(
  () => props.loading,
  () => {
    if (props.loading) {
      loading.value = true;
    } else {
      // 动画
    }
    setTimeout(() => {
      if (!props.loading) {
        loading.value = false;
      } else {
        // 动画
      }
    }, 1000);
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div class="mask">
    <template v-if="percentage">
      <el-progress
        type="dashboard"
        :percentage="percentage"
      />
    </template>
    <template v-else> 加载中</template>
  </div>
</template>

<style scoped lang="less">
.mask {
  transition: all 0.5s ease;
}
.enter {
}
.leave {
}
</style>
