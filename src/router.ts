import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", name: "home", component: () => import("@/pages/Home.vue") }, 
      {
        path: "history",
        name: "history",
        component: () => import("@/pages/History.vue"),
      },
      {
        path: "completed",
        name: "completed",
        component: () => import("@/pages/CompletedOrders.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
