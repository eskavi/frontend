<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn depressed color="primary" :to="{ path: '/' }" :ripple="false">
        <h2>ESKAVI Web</h2>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text :to="{ path: '/configurator' }">
        <v-icon left>mdi-wrench</v-icon>
        <span class="mr-2">Configurator</span>
      </v-btn>
      <v-btn text :to="{ path: '/modules' }">
        <v-icon left>mdi-view-module</v-icon>
        <span class="mr-2">Modules</span>
      </v-btn>
      <v-spacer></v-spacer>

      <v-tooltip bottom v-if="$store.getters.isAuthenticated">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" :to="{ path: '/account' }">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <span>Account</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-snackbar v-model="snackbar">
      {{ snackbarMsg }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',

  components: {},

  data() {
    return {
      snackbar: false,
    };
  },
  methods: {},
  computed: {
    snackbarMsg() {
      return this.$store.getters.getSnackbarMsg;
    },
    token() {
      return this.$store.getters.getUserToken;
    },
  },
  watch: {
    '$store.state.snackbarMsg': {
      handler(newMsg) {
        if (newMsg) {
          this.snackbar = true;
        }
      },
    },
    snackbar: {
      handler(state) {
        if (!state) {
          this.$store.dispatch('sendActionResponse', '');
        }
      },
    },
  },
  created() {
    if (this.$store.state.user.token) {
      this.$store.commit('setToken', this.$store.getters.getUserToken);
      axios
        .post('user/refresh')
        .then((response) => {
          this.$store.commit('setToken', response.data.jwt);
        })
        .catch(() => {
          // delete user currently stored in store
          this.$store.commit('clearUser');
          this.$store.commit('setToken');

          this.$store.dispatch('sendActionResponse', 'You have been logged out.');
        });
    }

    // refresh token every hour
    setInterval(() => {
      axios
        .post('user/refresh')
        .then((response) => {
          this.$store.commit('setToken', response.data.jwt);
          this.$store.dispatch('updateUserLevel');
        })
        .catch(() => {
          // delete user currently stored in store
          this.$store.commit('clearUser');
          this.$store.commit('setToken');

          this.$store.dispatch('sendActionResponse', 'You have been logged out.');
        });
    }, 3600000);
  },
};
</script>
