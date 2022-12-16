import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./store/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.VUE_APP_BASE_URL),
  routes: [
    {
      path: "/products",
      name: "products",
      component: () => import("./views/products.vue"),
      children: [
        {
          path: "",
          component: () => import("./views/products/index.vue"),
        },
        {
          path: ":detail",
          name: "productDetail",
          component: () => import("./views/products/detail.vue"),
        },
      ],
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
    to.name !== "productDetail"
  )
    return next({ name: "products" });
  next();
});

export default router;
