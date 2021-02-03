<template>
  <div class="authentication">
    <v-card class="px-8">
      <v-card-title> Login </v-card-title>
      <v-card-text> Please enter your mailing address and your password </v-card-text>
      <v-alert type="error" v-if="errorLogin"> Login unsuccessful. Please try again!</v-alert>
      <v-form @submit.prevent="login">
        <v-text-field v-model="user.email" label="E-mail address" required name="Email">
        </v-text-field>
        <v-text-field
          v-model="user.password"
          required
          :append-icon="showPWLogin ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPWLogin ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          @click:append="showPWLogin = !showPWLogin"
        >
        </v-text-field>
        <v-row>
          <v-btn type="submit" class="mx-2 my-4"> Login </v-btn>
          <v-btn class="mx-4 my-4 error"> Reset password</v-btn>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Authentication',

  data() {
    return {
      showPWLogin: false,
      errorLogin: false,
      errorCode: '',
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    // TODO fix the way the promise is delivered from store
    login() {
      this.$store
        .dispatch('loginUser', this.user)
        .then(() => {
          console.log('check2');
          this.$store.dispatch('sendActionResponse', 'You are now logged in!');
          this.$router.push('/configurator');
        })
        .catch(() => {
          this.errorLogin = true;
        });
    },
    initializePWDisplay() {
      this.showPWLogin = false;
    },
  },
};
</script>
