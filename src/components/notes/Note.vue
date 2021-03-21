<template>
    <v-card color="#385F73" dark @click="selectNote">
        <v-card-title class="headline">
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
  props: ['title', 'body', 'id'],
  computed: {
    isSelected() {
      return this.$store.getters.selectedNotes.indexOf(this.id) !== -1;
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
