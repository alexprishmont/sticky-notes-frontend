<template>
    <v-card color="#385F73" dark @click="selectNote">
        <v-card-title class="headline">
            <v-icon v-if="isFeatured">mdi-star</v-icon>
            {{ title }}
            <v-spacer></v-spacer>
            <v-icon v-if="isSelected">
              mdi-check-bold
            </v-icon>
        </v-card-title>
        <v-card-subtitle>
            {{ body }}
        </v-card-subtitle>
    </v-card>
</template>

<script>
export default {
  props: ['note'],
  computed: {
    isSelected() {
      return this.$store.getters.selectedNotes.indexOf(this.id) !== -1;
    },
    title() {
      return this.note.title;
    },
    body() {
      return this.note.body;
    },
    isFeatured() {
      return this.note.isFeatured;
    },
    id() {
      // eslint-disable-next-line
      return this.note._id;
    },
  },
  methods: {
    selectNote() {
      const { selectedNotes } = this.$store.getters;

      if (selectedNotes.indexOf(this.id) !== -1) {
        this.$store.commit('unselectNote', this.id);
        return;
      }

      this.$store.commit('selectNote', this.id);
    },
  },
};
</script>
