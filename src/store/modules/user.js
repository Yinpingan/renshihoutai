//划分模块 每一个模块下面都有一个state,mutations,actions,getters和namesoaced为true
import { setToken, getToken, removeToken } from "@/utils/auth";
import { login, getProfile } from "@/api/user";
const state = () => {
  return {
    token: getToken(),
    userInfo: {},
  };
};

const mutations = {
  setToken(state, token) {
    state.token = token;
    setToken(token);
  },
  removeToken(state) {
    state.token = null;
    removeToken();
  },
  setUserInfo(state, user) {
    state.userInfo = user;
  },
  removeUserInfo(state, data) {
    state.userInfo = data
  },
};
const actions = {
  // 登录的接口请求
  async login({ commit }, data) {
    let res = await login(data);
    // 提交commit 执行setToken
    commit("setToken", res);
  },
  async getProfile({ commit }) {
    let res = await getProfile();
    commit("setUserInfo", res);
    return res
  },
  logout({ commit }) {
    commit('removeToken')
    commit('removeUserInfo', {})
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
