<script lang="ts" setup>
import { i18n } from '@/locales';
import { computed } from 'vue';

const props = defineProps<{
  data: Record<string, string>;
}>();
const tableData = computed(() => {
  return Object.entries(props.data).map(
    ([label, value]) => ({
      label: i18n.global.t(label),
      value,
    }),
  );
});
</script>
<template>
  <el-table stripe :data="tableData" style="width: 100%">
    <el-table-column prop="label" />
    <el-table-column prop="value" />
  </el-table>
</template>
