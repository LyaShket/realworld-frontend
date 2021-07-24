import Vue from "vue";
import VueRouter from "vue-router";
import AppRegister from "@/views/Register";
import AppLogin from "@/views/Login";
import AppHome from "@/views/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: AppHome
  },
  {
    path: "/register",
    name: "register",
    component: AppRegister
  },
  {
    path: "/login",
    name: "login",
    component: AppLogin
  },
  {
    path: "/editor",
    name: "editor",
    component: null
  },
  {
    path: "/settings",
    name: "settings",
    component: null
  },
  {
    path: "/@:username",
    name: "user",
    component: null
  }
];

export default new VueRouter({
  mode: "history",
  routes
});
