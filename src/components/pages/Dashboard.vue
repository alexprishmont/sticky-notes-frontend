<template>
    <div>
      <SelectCounter :selected="selectedBoards"/>

      <v-row v-if="boardsData.boards && boardsData.boards.length">
          <v-col cols="12" md="4" v-for="board in boardsData.boards" :key="board._id">
              <BoardCard :board="board"/>
          </v-col>
      </v-row>

      <v-row v-else>
        <v-col cols="12" md="12">
          <v-alert
            outlined
            type="warning"
            prominent
            border="left"
          >
            You don't have any boards yet.
          </v-alert>
        </v-col>
      </v-row>

      <BoardActions/>
    </div>
</template>

<script>
import BoardCard from '@/components/boards/BoardCard.vue';
import SelectCounter from '@/components/SelectCounter.vue';
import BoardActions from '@/components/boards/BoardActions.vue';

export default {
  data() {
    return {
      boardsData: [],
    };
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setBoards') {
        this.$set(this.boardsData, 'boards', state.boards.boards);
      }

      if (mutation.type === 'setUser') {
        // eslint-disable-next-line
        if (state.auth.user._id) {
          this.$store.dispatch('loadBoards');
        }
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  beforeMount() {
    this.$store.commit('resetSelectedBoards');
    this.$store.dispatch('loadBoards');
  },
  components: {
    BoardCard,
    SelectCounter,
    BoardActions,
  },
  computed: {
    loadingStatus() {
      return this.$store.getters.loadingStatus;
    },
    selectedBoards() {
      return this.$store.getters.selectedBoards;
    },
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>
