import CREATE_BOARD_MUTATION from '@/graphql/mutations/board/createBoard.gql';
import UPDATE_BOARD_MUTATION from '@/graphql/mutations/board/updateBoard.gql';
import DELETE_BOARD_MUTATION from '@/graphql/mutations/board/deleteBoard.gql';
import getBoards from '@/graphql/queries/getBoards.gql';

import { apolloClient } from '@/vue-apollo';

const boardsStore = {
  state: {
    boards: [],
    selectedBoards: [],
  },
  getters: {
    boards: (state) => state.boards,
    selectedBoards: (state) => state.selectedBoards,
  },
  mutations: {
    unselectBoard(state, board) {
      const index = state.selectedBoards.indexOf(board);

      if (index === -1) {
        return;
      }

      state.selectedBoards.splice(index, 1);
    },
    selectBoard(state, board) {
      state.selectedBoards.push(board);
    },
    resetSelectedBoards(state) {
      state.selectedBoards = [];
    },
    setBoards(state, boards) {
      state.boards = boards;
    },
    removeBoards(state) {
      state.boards = [];
    },
    removeBoard(state, board) {
      const index = state.boards.indexOf(board);

      if (index === -1) {
        return;
      }

      state.boards.splice(index, 1);
    },
  },
  actions: {
    async loadBoards({ commit, dispatch }) {
      try {
        const { data } = await apolloClient.query({
          query: getBoards,
          fetchPolicy: 'network-only',
          variables: {
            filter: {
              operator: 'AND',
              filters: [{
                op: 'EQ',
                // eslint-disable-next-line
                values: [`${this.state.auth.user._id}`],
                field: 'userId',
              }],
            },
          },
        });
        commit('setBoards', data.boards.board);
      } catch (error) {
        dispatch('setError', error.message);
      }
    },
    async deleteBoard({ dispatch }, id) {
      try {
        const { data } = await apolloClient.mutate({
          mutation: DELETE_BOARD_MUTATION,
          variables: {
            id,
          },
        });

        dispatch('setSuccess', data.message);
      } catch (error) {
        dispatch('setError', error.message);
      }
    },
    async createBoard({ dispatch }, boardDetails) {
      try {
        await apolloClient.mutate({
          mutation: CREATE_BOARD_MUTATION,
          variables: {
            ...boardDetails,
          },
        });

        dispatch('setSuccess', 'Board is successfully created.');
      } catch (error) {
        dispatch('setError', error.message);
      }
    },
    async updateBoard({ dispatch }, boardDetails) {
      try {
        await apolloClient.mutate({
          mutation: UPDATE_BOARD_MUTATION,
          variables: {
            ...boardDetails,
          },
        });
        dispatch('setSuccess', `Board ${boardDetails.title} successfully updated.`);
      } catch (error) {
        dispatch('setError', error.message);
      }
    },
  },
};

export default boardsStore;
