import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./store/auth";
import Home from "./views/home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/products",
      name: "products",
      component: () => import("./views/products.vue"),
    },
    {
      path: "/my-todo",
      name: "my-todo",
      component: () => import("./views/my-todo.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/register.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (
    !authStore.isLoggedIn &&
    to.name !== "login" &&
    to.name !== "register" &&
    to.name !== "products" &&
    to.name !== "home"
  )
    return next({ name: "home" });
  next();
});

export default router;
