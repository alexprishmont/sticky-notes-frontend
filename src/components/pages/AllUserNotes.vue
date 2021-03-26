<template>
    <div>
        <NotesView/>
    </div>
</template>

<script>
import NotesView from '@/components/notes/NotesView.vue';

export default {
  components: {
    NotesView,
  },
  beforeMount() {
    this.$store.commit('resetSelectedNotes');
    this.$store.dispatch('loadAllUserNotes');
  },
  computed: {
    selectedNotes() {
      return this.$store.getters.selectedNotes;
    },
  },
};
</script>
