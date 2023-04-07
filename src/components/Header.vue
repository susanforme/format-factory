<!--
 * @Author: zhicheng ran
 * @Date: 2023-04-04 16:47:03
 * @LastEditTime: 2023-04-07 13:55:11
 * @FilePath: \format-factory\src\components\Header.vue
 * @Description: 
-->
<script lang="ts" setup>
import { LANGUAGE_NAME } from '@/constants';
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

const handleSelect = (key: string) => {
  const path = key.replace('/:locale/', '');
  router.push(`./${path}`);
};
const handleCommand = (command: string) => {
  const path = route.path.replace(/\/.+\//, '/');
  router.push(`/${command}${path}`);
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
        v-for="r in routes"
        :key="r.path"
        :index="r.path"
        >{{ $t(r.name as any) }}
      </el-menu-item>
      <div class="right">
        <el-dropdown @command="handleCommand">
          <el-icon size="24">
            <svg
              t="1680761186855"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3308"
              width="512"
              height="512"
            >
              <path
                d="M547.797333 638.208l-104.405333-103.168 1.237333-1.28a720.170667 720.170667 0 0 0 152.490667-268.373333h120.448V183.082667h-287.744V100.906667H347.605333v82.218666H59.818667V265.386667h459.178666a648.234667 648.234667 0 0 1-130.304 219.946666 643.242667 643.242667 0 0 1-94.976-137.728H211.541333a722.048 722.048 0 0 0 122.453334 187.434667l-209.194667 206.378667 58.368 58.368 205.525333-205.525334 127.872 127.829334 31.232-83.84m231.424-208.426667h-82.218666l-184.96 493.312h82.218666l46.037334-123.306667h195.242666l46.464 123.306667h82.218667l-185.002667-493.312m-107.690666 287.744l66.56-178.005333 66.602666 178.005333z"
                fill="#7986CB"
                p-id="3309"
              ></path>
            </svg>
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(name, code) in LANGUAGE_NAME"
                :key="code"
                :command="code"
                >{{ name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
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
    position: relative;
    .right {
      position: absolute;
      right: 10%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      outline: none;
      border: none;
      *:focus {
        outline: none;
        border: none;
      }
    }
  }
}
</style>
