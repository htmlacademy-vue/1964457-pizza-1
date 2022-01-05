import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/Index.vue";
import Cart from "@/views/Cart.vue";
import Login from "@/views/Login.vue";
import Orders from "@/views/Orders.vue";
import Profile from "@/views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      layout: "AppLayoutMain",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
