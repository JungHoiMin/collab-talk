import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    children: [
      {
        path: "/friend",
        name: "friend",
        component: () => import("@/views/FriendManagementView.vue"),
      },
      {
        path: "/dm/:id",
        name: "dm",
        component: () => import("@/views/ChattingView.vue"),
      },
      {
        path: "/room/:id",
        name: "room",
        component: () => import("@/views/ChattingView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
