<template>
  <div class="authentication">
    <v-card class="px-8">
      <v-card-title> Login </v-card-title>
      <v-card-text> Please enter your mailing address and your password </v-card-text>
      <v-alert type="error" v-if="errorLogin"> Login unsuccessful. Please try again!</v-alert>
      <v-form @submit.prevent="login" ref="loginForm">
        <v-text-field v-model="user.email" label="E-mail address" :rules="emailRule" name="Email">
        </v-text-field>
        <v-text-field
          v-model="user.password"
          required
          :append-icon="showPWLogin ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPWLogin ? 'text' : 'password'"
          :rules="passwordRule"
          name="input-10-1"
          label="Password"
          @click:append="showPWLogin = !showPWLogin"
        >
        </v-text-field>
        <v-row>
          <v-col>
            <v-btn type="submit" class="mx-2 my-8"> Login </v-btn>

            <ResetPassword class="my-8" />
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import ResetPassword from './ResetPassword.vue';

export default {
  name: 'Authentication',
  components: {
    ResetPassword,
  },
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
    login() {
      if (this.$refs.loginForm.validate()) {
        this.$store
          .dispatch('loginUser', this.user)
          .then(() => {
            this.$store.dispatch('sendActionResponse', 'You are now logged in!');
            this.$router.push('/configurator');
          })
          .catch(() => {
            this.errorLogin = true;
          });
      }
    },
    initializePWDisplay() {
      this.showPWLogin = false;
    },
  },
  computed: {
    emailRule() {
      return [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ];
    },
    passwordRule() {
      return [(v) => !!v || 'Password is required'];
    },
  },
};
</script>
