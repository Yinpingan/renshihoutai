import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import user from "./modules/user";
import getters from "./getters";
import app from "./modules/app";
import settings from "@/settings";
import myrouter from "./modules/myrouter";
const store = new Vuex.Store({
  modules: {
    // 模块名：模块
    user,
    app,
    settings,
    myrouter
  },
  getters,
});

export default store;
