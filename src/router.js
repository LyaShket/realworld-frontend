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
  }
];

export default new VueRouter({
  mode: "history",
  routes
});
