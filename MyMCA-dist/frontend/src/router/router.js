/*
* File name: router.js
* Purpose: Creates and manages the links between Vue components
* Authors: Heather Miller, Chloe McQuin
* Date Created: 2/20/22
* Last Modified: 4/23/22
*/

import { createRouter, createWebHistory } from "vue-router";
const routes =  [
  {
    path: "/",
    alias: "/login",
    component: () => import("../components/Login")
  },
  {
    path: "/programs",
    component: () => import("../components/ProgramViewer")
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
  },
  {
    path: "/enrollments",
    component: () => import("../components/EnrollmentViewer")
  },
  {
    path: "/users",
    component: () => import("../components/UserViewer")
  },
  {
    name: "edit-program",
    path: "/edit-program",
    component: () => import("../components/EditProgram"),
    props: true
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;