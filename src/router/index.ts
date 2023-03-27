/*
 * @Author: zhicheng ran
 * @Date: 2023-03-10 15:12:33
 * @LastEditTime: 2023-03-27 15:32:46
 * @FilePath: \format-factory\src\router\index.ts
 * @Description:
 */
import { createRouter, createWebHashHistory } from "vue-router";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/video",
    },
    {
      name: "video",
      path: "/video",
      component: () => import("@/views/Video/Video.vue"),
      meta: {
        title: "视频",
      },
    },
    {
      name: "picture",
      path: "/picture",
      component: () => import("@/views/Picture/Picture.vue"),
      meta: {
        title: "图像",
      },
    },
    {
      name: "audio",
      path: "/audio",
      component: () => import("@/views/Audio/Audio.vue"),
      meta: {
        title: "音频",
      },
    },
  ],
});
