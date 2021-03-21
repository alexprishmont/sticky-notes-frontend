<template>
  <v-banner two-line v-if="cookiePopup == null">
    <v-avatar
      slot="icon"
      color="deep-purple accent-4"
      size="40"
    >
      <v-icon
        icon="mdi-lock"
        color="white"
      >
        mdi-lock
      </v-icon>
    </v-avatar>

    <h1>This website uses cookies</h1>
    <p>
        We use cookies to personalise content and ads,
        to provide social media features and to analyse our traffic.
    </p>

    <template v-slot:actions>
      <v-btn
        text
        color="deep-purple accent-4"
        @click="setCookie(true)"
      >
        Accept
      </v-btn>
      <v-btn
        text
        color="deep-purple accent-4"
        @click="setCookie(false)"
      >
        Decline
      </v-btn>
    </template>
  </v-banner>
</template>

<script>
export default {
  computed: {
    cookiePopup() {
      return this.$store.getters.cookiePopup;
    },
  },
  methods: {
    setCookie(status) {
      this.$store.dispatch('setCookiePopupStatus', status);
    },
  },
};
</script>
