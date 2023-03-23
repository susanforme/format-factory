<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const routes = router.getRoutes().filter((route) => {
  return route.redirect === undefined;
});
console.log(
  "%c [ routes ]-6",
  "font-size:13px; background:pink; color:#bf2c9f;",
  routes
);
</script>

<template>
  <div id="content">
    <header>
      <div class="header">
        <div v-for="route in routes" :key="route.path" class="link">
          <router-link :to="route.path">
            {{ route.meta.title }}
          </router-link>
        </div>
      </div>
    </header>
    <main>
      <router-view></router-view>
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
    width: 80%;
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
