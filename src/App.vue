<template>
  <v-app>
    <LoadingBar v-if="loadingStatus"/>
    <v-main v-if="!loadingStatus">
      <Sidebar v-if="isAuth"/>
      <CookiesPopup/>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="12">
            <v-alert
              border="bottom"
              colored-border
              type="warning"
              elevation="2"
              v-if="error"
            >
              {{ error }}
            </v-alert>

            <v-alert
              border="bottom"
              colored-border
              type="success"
              elevation="2"
              v-if="success"
            >
              {{ success }}
            </v-alert>
          </v-col>
        </v-row>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar.vue';
import CookiesPopup from '@/components/CookiesPopup.vue';
import LoadingBar from '@/components/LoadingBar.vue';

export default {
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setError') {
        this.error = state.messages.error;
        return;
      }

      if (mutation.type === 'setSuccess') {
        this.success = state.messages.success;
      }
    });
  },
  beforeMount() {
    this.$store.commit('loadingStatus', true);
    this.$store.dispatch('setUser');
    setTimeout(() => {
      this.$store.commit('loadingStatus', false);
    }, 2000);
  },
  components: {
    Sidebar,
    CookiesPopup,
    LoadingBar,
  },
  data() {
    return {
      error: null,
      success: null,
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuthenticated;
    },
    loadingStatus() {
      return this.$store.getters.loadingStatus;
    },
  },
};
</script>
