<!--
 * @Author: zhicheng ran
 * @Date: 2023-04-04 16:47:03
 * @LastEditTime: 2023-04-04 17:43:04
 * @FilePath: \format-factory\src\components\Header.vue
 * @Description: 
-->
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const activeIndex = ref('');

watch(
  route,
  () => {
    activeIndex.value = `/:locale/${route.name as string}`;
  },
  {
    immediate: true,
  },
);

const routes = router.getRoutes().filter(route => {
  return route.redirect === undefined;
});

const handleSelect = (key: string, keyPath: string[]) => {
  const path = key.replace('/:locale/', '');
  router.push(`./${path}`);
};
</script>

<template>
  <header>
    <el-menu
      class="menu"
      mode="horizontal"
      :default-active="activeIndex"
      @select="handleSelect"
    >
      <el-menu-item
        v-for="route in routes"
        :key="route.path"
        :index="route.path"
        >{{ route.meta.title }}</el-menu-item
      >
    </el-menu>
  </header>
</template>

<style scoped lang="less">
header {
  // height: 50px;
  // width: 100%;
  // background-color: black;
  position: sticky;
  top: 0;
  z-index: 100;
  .menu {
    width: 100%;
    padding: 0 10%;
    .right {
    }
  }
}
</style>
