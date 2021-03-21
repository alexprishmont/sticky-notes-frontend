import { apolloClient } from '@/vue-apollo';
import getNotes from '@/graphql/queries/getNotes.gql';
import createNote from '@/graphql/mutations/createNote.gql';
import deleteNote from '@/graphql/mutations/deleteNote.gql';
import updateNote from '@/graphql/mutations/updateNote.gql';

const notesStore = {
  state: {
    notes: [],
    selectedNotes: [],
  },
  getters: {
    selectedNotes: (state) => state.selectedNotes,
    notes: (state) => state.notes,
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes;
    },
    selectNote(state, note) {
      state.selectedNotes.push(note);
    },
    unselectNote(state, note) {
      const index = state.selectedNotes.indexOf(note);

      if (index === -1) {
        return;
      }

      state.selectedNotes.splice(index, 1);
    },
    resetSelectedNotes(state) {
      state.selectedNotes = [];
    },
  },
  actions: {
    async updateNote({ dispatch }, noteDetails) {
      try {
        await apolloClient.mutate({
          mutation: updateNote,
          variables: {
            ...noteDetails,
          },
        });

        dispatch('setSuccess', `Note ${noteDetails.title} is updated.`);
      } catch (error) {
        dispatch('setError', error.message);
      }
    },
    async deleteNote({ dispatch }, id) {
      try {
        const { data } = await apolloClient.mutate({
          mutation: deleteNote,
          variables: {
            id,
          },
        });

        dispatch('setSuccess', data.message);
      } catch (error) {
        dispatch('setError', error.message);
      }
    },
    async createNote({ dispatch }, noteDetails) {
      try {
        await apolloClient.mutate({
          mutation: createNote,
          variables: {
            ...noteDetails,
          },
        });

        dispatch('setSuccess', 'Note is succesfully added!');
      } catch (error) {
        dispatch('setError', error.message);
      }
    },
    async loadAllUserNotes({ commit, dispatch }) {
      try {
        const { data } = await apolloClient.query({
          query: getNotes,
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
        commit('setNotes', data.notes.note);
      } catch (error) {
        dispatch('setError', error.message);
      }
    },
    async loadNotes({ commit, dispatch }, boardId) {
      try {
        const { data } = await apolloClient.query({
          query: getNotes,
          fetchPolicy: 'network-only',
          variables: {
            filter: {
              operator: 'AND',
              filters: [{
                op: 'EQ',
                values: [`${boardId}`],
                field: 'boardId',
              }],
            },
          },
        });
        commit('setNotes', data.notes.note);
      } catch (error) {
        dispatch('setError', error.message);
      }
    },
  },
};

export default notesStore;
