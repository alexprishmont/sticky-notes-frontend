<template>
    <div>
        <v-row class="text-center">
            <v-col cols="12" md="12">
                <v-avatar size="150">
                    <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
                </v-avatar>
            </v-col>
            <v-col cols="12" md="12">
                <h1>{{ user.name }}</h1>
            </v-col>
            <v-col class="pa-0" cols="12" md="12">
                <p class="help-text">{{ user.email }}</p>
                <v-spacer></v-spacer>
                <p class="help-text">Member since:  {{ createdAt }}</p>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="6">
                <v-card
                    class="mx-auto text-center"
                    color="green"
                    dark
                    max-width="600"
                >
                    <v-card-text>
                        <div class="display-1 font-weight-thin">
                            Notes created by you
                        </div>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-text>
                        <div class="display-2 font-weight-thin">
                            {{ notesCount }}
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" md="6">
                <v-card
                    class="mx-auto text-center"
                    color="indigo"
                    dark
                    max-width="600"
                >
                    <v-card-text>
                        <div class="display-1 font-weight-thin">
                            Boards created by you
                        </div>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-text>
                        <div class="display-2 font-weight-thin">
                            {{ boardsCount }}
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
  beforeMount() {
    this.$store.dispatch('loadAllUserNotes');
    this.$store.dispatch('loadBoards');
  },
  computed: {
    boardsCount() {
      return this.$store.getters.boards.length;
    },
    notesCount() {
      return this.$store.getters.notes.length;
    },
    user() {
      return this.$store.getters.user;
    },
    createdAt() {
      const options = {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      };
      const createdAt = new Date(this.$store.getters.user.createdAt);
      return createdAt.toLocaleDateString('en-US', options);
    },
  },
};
</script>
