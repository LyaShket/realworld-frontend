import Vue from "vue";
import VueRouter from "vue-router";
import AppRegister from "@/views/Register";

Vue.use(VueRouter);

const routes = [
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
