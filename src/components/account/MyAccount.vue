<template>
    <div class="text-center">
        <v-row>
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
            </v-col>
        </v-row>

        <v-row>

        </v-row>
    </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>
