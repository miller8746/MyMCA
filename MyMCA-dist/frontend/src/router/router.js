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
  },
  {
    path: "/create-account",
    component: () => import("../components/CreateAccount")
  },
  {
    path: "/profile",
    component: () => import("../components/Profile")
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;