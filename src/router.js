import Vue from "vue";
import VueRouter from "vue-router";
import AppRegister from "@/views/Register";
import AppLogin from "@/views/Login";
import AppHome from "@/views/Home";
import AppEditor from "@/views/Editor";
import AppSettings from "@/views/Settings";
import AppArticle from "@/views/Article";

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
    path: "/editor/:slug",
    name: "editor_slug",
    component: AppEditor
  },
  {
    path: "/editor",
    name: "editor",
    component: AppEditor
  },
  {
    path: "/settings",
    name: "settings",
    component: AppSettings
  },
  {
    path: "/@:username",
    name: "user",
    component: null
  },
  {
    path: "/article/:slug",
    name: "article",
    component: AppArticle
  }
];

export default new VueRouter({
  mode: "history",
  routes
});
