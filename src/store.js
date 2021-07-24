import Vue from "vue";
import Vuex from "vuex";
import axios from "@/api/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    authToken: localStorage.getItem("authToken")
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setAuthToken(state, authToken) {
      state.authToken = authToken;
    }
  },
  actions: {
    authorize(context, user) {
      context.commit("setCurrentUser", user);
      const authToken = user.token;
      context.commit("setAuthToken", authToken);
      localStorage.setItem("authToken", authToken);
    },
    getCurrentUser(context) {
      return new Promise(resolve => {
        axios
          .get("user", {
            headers: {
              authorization: "Token " + context.state.authToken
            }
          })
          .then(response => {
            context.commit("setCurrentUser", response.data.user);
            resolve();
          })
          .catch(() => {
            context.commit("setCurrentUser", null);
            context.commit("setAuthToken", "");
            resolve();
          });
      });
    },
    logout(context) {
      context.commit("setCurrentUser", null);
      context.commit("setAuthToken", "");
      localStorage.removeItem("authToken");
    }
  },
  modules: {}
});
