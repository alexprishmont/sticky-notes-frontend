<template>
  <div>
    <SelectCounter :selected="selectedNotes"/>

    <v-row>
      <v-col cols="6" md="3">
        <v-switch
          v-model="onlyFeatured"
          label="Show only featured"
          color="green"
          value="true"
          hide-details
        ></v-switch>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4" v-for="note in notesData.notes" :key="note._id">
        <Note :note="note"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SelectCounter from '@/components/SelectCounter.vue';
import Note from './Note.vue';

export default {
  data() {
    return {
      notesData: [],
      onlyFeatured: false,
    };
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setNotes') {
        this.$set(this.notesData, 'notes', state.notes.notes);
      }
    });
  },
  watch: {
    onlyFeatured(newValue) {
      if (!newValue) {
        this.$set(this.notesData, 'notes', this.$store.getters.notes);
        return;
      }

      const notes = this.notesData.notes.filter((note) => note.isFeatured);
      this.$set(this.notesData, 'notes', notes);
    },
  },
  computed: {
    selectedNotes() {
      return this.$store.getters.selectedNotes;
    },
  },
  beforeMount() {
    this.$store.commit('resetSelectedNotes');
    this.$store.dispatch('loadAllUserNotes');
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  components: {
    Note,
    SelectCounter,
  },
};
</script>
