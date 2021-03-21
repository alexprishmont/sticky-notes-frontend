import registerMutation from '@/graphql/mutations/register.gql';
import loginMutation from '@/graphql/mutations/login.gql';
import getUserQuery from '@/graphql/queries/getCurrentUser.gql';
import { apolloClient } from '@/vue-apollo';
import router from '@/router';
import config from '@/config';

const authStore = {
  state: {
    token: localStorage.getItem(config.AUTH_HEADER) || null,
    user: {},
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    user: (state) => state.user,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async login({ commit, dispatch }, authDetails) {
      try {
        const { data } = await apolloClient.mutate({
          mutation: loginMutation,
          variables: {
            ...authDetails,
          },
        });

        const token = JSON.stringify(data.login.token);
        localStorage.setItem(config.AUTH_HEADER, token);
        dispatch('setUser');
        commit('setToken', token);
        router.push({ path: '/dashboard' });
      } catch (error) {
        dispatch('setError', error.message.substr(error.message.indexOf(':') + 1, error.message.length));
      }
    },

    async register({ dispatch }, authDetails) {
      try {
        await apolloClient.mutate({
          mutation: registerMutation,
          variables: {
            ...authDetails,
          },
        });

        dispatch('setSuccess', 'Registration is successful. Please sign in.');
        router.push({ path: '/login' });
      } catch (error) {
        dispatch('setError', error.message.substr(error.message.indexOf(':') + 1, error.message.length));
      }
    },

    logout({ commit, dispatch }) {
      commit('setUser', {});
      commit('setToken', null);
      dispatch('setSuccess', 'See you later!');
      localStorage.removeItem(config.AUTH_HEADER);
      router.push({ path: '/login' });
    },

    async setUser({ commit, dispatch }) {
      try {
        const { data } = await apolloClient.query({ query: getUserQuery });
        commit('setUser', data.me);
      } catch (error) {
        if (this.state.token) {
          router.push({ path: '/login' });
          dispatch('setError', 'Your session is not valid.');
        }
      }
    },
  },
};

export default authStore;
