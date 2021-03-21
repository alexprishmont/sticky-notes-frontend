<template>
  <div>
    <Header/>
    <v-form v-model="valid">
      <form>
        <v-container fill-height>
          <v-row>
            <v-col cols="12" md="12">
              <h1>Sign Up</h1>
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
                v-model="authDetails.name"
                :rules="nameRules"
                label="Name"
                required
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
                Sign Up
              </v-btn>
            </v-col>
          </v-row>
          <v-spacer/>
          <v-row>
            <v-col cols="12" md="7">
              <p class="help-text">
                Already have an account?
                <router-link to="/login">Sign in!</router-link>
              </p>
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
      name: '',
    },
    valid: false,
    backendError: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length > 2 || 'Name should be more than 2 symbols',
    ],
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
      this.$store.dispatch('register', this.authDetails);
    },
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    success() {
      return this.$store.getters.success;
    },
  },
};
</script>
