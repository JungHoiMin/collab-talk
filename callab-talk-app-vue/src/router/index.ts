import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FriendManagementView from "@/views/FriendManagementView.vue";
import ChattingView from "@/views/ChattingView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "/friend",
        name: "friend",
        component: FriendManagementView,
      },
      {
        path: "/chat/:id",
        name: "chat",
        component: ChattingView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
