/*
 * @Author: zhicheng ran
 * @Date: 2023-03-10 15:12:33
 * @LastEditTime: 2023-03-23 14:01:47
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
      component: () => import("../views/Video.vue"),
    },
    {
      name: "picture",
      path: "/picture",
      component: () => import("../views/Picture.vue"),
    },
  ],
});
