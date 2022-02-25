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
  {
    path: "/create-program",
    component: () => import("../components/CreateProgram")
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;