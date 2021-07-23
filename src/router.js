import Vue from "vue";
import VueRouter from "vue-router";
import AppRegister from "@/views/Register";
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
  }
];

export default new VueRouter({
  mode: "history",
  routes
});
