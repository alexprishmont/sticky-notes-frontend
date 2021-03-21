<template>
  <div>
    <SelectCounter :selected="selectedNotes"/>
    <v-row>
      <v-col cols="12" md="4" v-for="note in notesData.notes" :key="note._id">
        <Note :title="note.title" :body="note.body" :id="note._id"/>
      </v-col>
    </v-row>
    <NoteActions/>
  </div>
</template>

<script>
import Note from '@/components/notes/Note.vue';
import NoteActions from '@/components/notes/NoteActions.vue';
import SelectCounter from '@/components/SelectCounter.vue';

export default {
  setup() {

  },
  components: {
    Note,
    NoteActions,
    SelectCounter,
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setNotes') {
        this.$set(this.notesData, 'notes', state.notes.notes);
      }
    });
  },
  beforeMount() {
    this.$store.commit('resetSelectedNotes');
    this.$store.dispatch('loadNotes', this.$route.params.id);
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  computed: {
    selectedNotes() {
      return this.$store.getters.selectedNotes;
    },
  },
  data() {
    return ({
      notesData: [],
    });
  },
};
</script>
