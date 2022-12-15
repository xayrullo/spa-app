import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/home.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/my-todo",
      component: () => import("./views/my-todo.vue"),
    },
    {
      path: "/login",
      component: () => import("./views/login.vue"),
    },
    {
      path: "/register",
      component: () => import("./views/register.vue"),
    },
  ],
});
