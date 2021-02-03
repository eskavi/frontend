<template>
  <div class="registration">
    <v-card class="px-8">
      <v-card-title> Register </v-card-title>
      <v-card-text> Create a new user account.</v-card-text>
      <v-alert type="error" v-if="showError"> Error. You could not be registered.</v-alert>
      <v-form @submit.prevent="registerUser">
        <v-text-field label="E-mail adress" name="Email" v-model="newUser.email"> </v-text-field>
        <v-text-field
          v-model="newUser.password"
          required
          :rules="passwordRule"
          :append-icon="showPW ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPW ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          @click:append="showPW = !showPW"
        >
        </v-text-field>
        <v-text-field
          v-model="passwordRepeat"
          required
          :rules="passwordRepeatRule"
          :append-icon="showPWRepeat ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPWRepeat ? 'text' : 'password'"
          name="input-10-1"
          label="Repeat password"
          @click:append="showPWRepeat = !showPWRepeat"
        >
        </v-text-field>
        <v-btn class="mb-4" type="submit"> Register </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Authentication',

  data() {
    return {
      showPW: false,
      showPWRepeat: false,
      showError: false,
      passwordRepeat: '',
      errMessage: '',
      newUser: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    registerUser() {
      this.$store
        .dispatch('registerNewUser', this.newUser)
        .then(() => {
          this.$store.dispatch('sendActionResponse', 'You are now registered and logged.');
          this.$router.push('/configurator');
        })
        .catch(() => {
          this.showError = true;
        });
    },
  },
  computed: {
    passwordRule() {
      return [(v) => !!v || 'Enter a password please'];
    },
    passwordRepeatRule() {
      return [(v) => (!!v && v) === this.newUser.password || 'Passwords do not match'];
    },
  },
};
</script>
