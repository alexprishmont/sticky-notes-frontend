<template>
  <div>
    <Header/>
    <v-form v-model="valid">
      <form>
        <v-container fill-height>
          <v-row>
            <v-col cols="12" md="12">
              <h1>Sign In</h1>
            </v-col>
          </v-row>
          <v-spacer/>
          <v-row>
            <v-col
              cols="12"
              md="7"
            >
              <v-text-field
                v-model="authDetails.email"
                :rules="emailRules"
                label="E-mail"
                required
                type="email"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-spacer/>
          <v-row>
            <v-col
              cols="12"
              md="7"
            >
              <v-text-field
                v-model="authDetails.password"
                :rules="passwordRules"
                label="Password"
                type="password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="7"
            >
              <v-btn
                outlined
                color="success"
                :disabled="!valid"
                @click="sign"
                large
              >
                Sign In
              </v-btn>
            </v-col>
          </v-row>
          <v-spacer/>
          <v-row>
            <v-col cols="12" md="7">
              <p class="help-text">
                Don't have an account yet?
                <router-link to="/register">Sign up!</router-link>
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-alert
                text
                prominent
                type="error"
                icon="mdi-cloud-alert"
                v-if="backendError"
              >
                {{ backendError }}
              </v-alert>
            </v-col>
          </v-row>
        </v-container>
      </form>
    </v-form>
  </div>
</template>

<style src="./style.less" lang="less"></style>

<script>
import Header from './Header.vue';

export default {
  setup() {

  },
  mounted() {

  },
  components: {
    Header,
  },
  data: () => ({
    authDetails: {
      email: '',
      password: '',
    },
    valid: false,
    backendError: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => v.length > 5 || 'Password should be more than 5 symbols',
    ],
  }),
  methods: {
    sign() {
      this.$store.dispatch('login', this.authDetails);
    },
  },
  computed: {
    loadingStatus() {
      return this.$store.getters.loadingStatus;
    },
  },
};
</script>
