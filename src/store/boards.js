import createBoardMutation from '@/graphql/mutations/createBoard.gql';
import getBoards from '@/graphql/queries/getBoards.gql';
import updateBoard from '@/graphql/mutations/updateBoard.gql';
import deleteBoardMutation from '@/graphql/mutations/deleteBoard.gql';
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
          mutation: deleteBoardMutation,
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
          mutation: createBoardMutation,
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
          mutation: updateBoard,
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
