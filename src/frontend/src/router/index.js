import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/Index.vue";
import Cart from "@/views/Cart.vue";
import Login from "@/views/Login.vue";
import Orders from "@/views/Orders.vue";
import Profile from "@/views/Profile.vue";
import {
  auth,
  middlewarePipeline,
  nonAuthenticatedOnly,
  authenticatedOnly,
  profile,
} from "@/middlewares";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    meta: {
      layout: "AppLayoutMain",
      middlewares: [auth],
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: {
      layout: "AppLayoutMain",
      middlewares: [auth],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      layout: "AppLayoutMain",
      middlewares: [auth, nonAuthenticatedOnly],
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    meta: {
      layout: "AppLayoutMainWithSidebar",
      middlewares: [auth, authenticatedOnly],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      layout: "AppLayoutMainWithSidebar",
      middlewares: [auth, authenticatedOnly, profile],
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const middlewares = to.meta.middlewares;
  if (!middlewares?.length) {
    return next();
  }

  // Запускаем обход по цепочке проверок
  const context = { to, from, next, store };
  const firstMiddlewareIndex = 0;
  const nextMiddlewareIndex = 1;
  return middlewares[firstMiddlewareIndex]({
    ...context,
    nextMiddleware: middlewarePipeline(
      context,
      middlewares,
      nextMiddlewareIndex
    ),
  });
});

export default router;
