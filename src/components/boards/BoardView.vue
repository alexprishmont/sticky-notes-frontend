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
    this.$store.dispatch('loadNotes', this.$route.params.id);
  },
  computed: {
    selectedNotes() {
      return this.$store.getters.selectedNotes;
    },
  },
};
</script>
