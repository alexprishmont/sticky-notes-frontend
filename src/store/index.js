import Vue from 'vue';
import Vuex from 'vuex';

import boardsStore from './boards';
import notesStore from './notes';
import messagesStore from './messages';
import authStore from './auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    cookiePopupStatus: localStorage.getItem('cookies-accepted') || null,
  },
  getters: {
    loadingStatus: (state) => state.loading,
    cookiePopup: (state) => state.cookiePopupStatus,
  },
  mutations: {
    loadingStatus(state, newLoadingStatus) {
      state.loading = newLoadingStatus;
    },
    setCookiePopupStatus(state, status) {
      state.cookiePopupStatus = status;
    },
  },
  actions: {
    setCookiePopupStatus({ commit }, status) {
      commit('setCookiePopupStatus', status);
      localStorage.setItem('cookies-accepted', status);
    },
  },
  modules: {
    auth: authStore,
    boards: boardsStore,
    notes: notesStore,
    messages: messagesStore,
  },
});
