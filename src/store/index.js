import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: null,
    username: null
  },
  mutations: {
    insertUser(state, { userId, username }) {
      (state.userId = userId), (state.username = username);
    }
  },
  getters: {
    username: state => {
      return state.username;
    },
    userId: state => {
      return state.userId;
    }
  },
  actions: {
    insertUser: ({ commit }, userData) => {
      commit("insertUser", userData);
    }
  },
  modules: {}
});
