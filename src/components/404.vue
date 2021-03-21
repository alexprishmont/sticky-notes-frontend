<template>
    <div class="not-found">
        <v-card class="text-center" height="400" color="transparent" flat>
            <div class="pa-5 display-3 mt-5">Page not found.</div>
            <div class="grey--text lighten-5">
                The page you are trying to get to never existed
                in this reality, or has migrated to a parallel universe.
            </div>
            <div class="paragraph-text mt-2">
                Try going back to home page and repeating your action.
                Or, contact helpdesk for support.
            </div>
            <div class="pa-15">
                <v-btn outlined color="green" large @click="redirect">
                    TO HOME PAGE
                </v-btn>
            </div>
        </v-card>
    </div>
</template>

<style lang="less">
  .paragraph-text {
    font-size: 18px;
  }
</style>

<script>
export default {
  methods: {
    redirect() {
      if (this.$store.getters.isAuthenticated) {
        this.$router.push({ path: '/dashboard' });
        return;
      }

      this.$router.push({ path: '/login' });
    },
  },
};
</script>
