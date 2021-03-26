<template>
  <div>
    <SelectCounter :selected="selectedNotes"/>

    <v-row>
      <v-col cols="12" md="3">
        <v-switch
          v-model="onlyFeatured"
          label="Show only featured"
          color="green"
          value="true"
          hide-details
        ></v-switch>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchField"
          label="Search"
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="notesData.notes && notesData.notes.length">
      <v-col cols="12" md="4" v-for="note in notesData.notes" :key="note._id">
        <Note :note="note"/>
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
          You don't have any notes yet.
        </v-alert>
      </v-col>
    </v-row>

    <NoteActions :createActionAllowed="createActionAllowed"/>
  </div>
</template>

<script>
import SelectCounter from '@/components/SelectCounter.vue';
import Note from './Note.vue';
import NoteActions from './NoteActions.vue';

export default {
  data() {
    return {
      notesData: [],
      onlyFeatured: false,
      searchField: '',
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
    searchField(newValue) {
      if (!newValue) {
        this.$set(this.notesData, 'notes', this.$store.getters.notes);
        return;
      }

      const notes = this.notesData.notes.filter((note) => note.title.search(newValue) !== -1);
      this.$set(this.notesData, 'notes', notes);
    },
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
    createActionAllowed() {
      return this.$router.history.current.path !== '/notes';
    },
    selectedNotes() {
      return this.$store.getters.selectedNotes;
    },
  },
  beforeMount() {
    this.$store.commit('resetSelectedNotes');
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  components: {
    Note,
    SelectCounter,
    NoteActions,
  },
};
</script>
