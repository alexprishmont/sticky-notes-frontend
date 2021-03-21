const messagesStore = {
  state: {
    error: null,
    success: null,
  },
  getters: {
    error: (state) => state.error,
    success: (state) => state.success,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setSuccess(state, success) {
      state.success = success;
    },
  },
  actions: {
    setSuccess({ commit }, message) {
      commit('setSuccess', message);
      setTimeout(() => {
        commit('setSuccess', null);
      }, 3000);
    },
    setError({ commit }, message) {
      commit('setError', message);
      setTimeout(() => {
        commit('setError', null);
      }, 3000);
    },
  },
};

export default messagesStore;
