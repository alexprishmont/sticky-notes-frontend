<template>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-avatar size="40">
            <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-title>
          <router-link class="link-to-account" to="/account">{{ user.name }}</router-link>
        </v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.path"
          @click="clickMenuEntry(item)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<style lang="less">
  a.link-to-account {
    text-decoration: none;
    color: rgba(0,0,0,.87);
    transition: 0.1s ease-in;

    &:hover {
      color: green;
      font-weight: 600;
    }
  }
</style>

<script>
export default {
  setup() {

  },
  data() {
    return {
      drawer: true,
      items: [
        { title: 'Dashboard', icon: 'mdi-home-city', path: '/dashboard' },
        { title: 'All my notes', icon: 'mdi-message-bulleted', path: '/notes' },
        {
          title: 'Logout', icon: 'mdi-logout', path: '/', logout: true,
        },
      ],
      mini: true,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    clickMenuEntry(item) {
      if (!item.logout) {
        return;
      }

      this.$store.dispatch('logout');
    },
  },
};
</script>
