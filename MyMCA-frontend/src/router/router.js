import { createRouter, createWebHistory } from "vue-router";
const routes =  [
  {
    path: "/",
    alias: "/login",
    component: () => import("../components/Login")
  },
  {
    path: "/programs",
    component: () => import("../components/Programs")
  },
  
];
const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;