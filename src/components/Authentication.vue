<template>
  <div class="authentication">
    <v-card class="px-8">
      <v-card-title> Login </v-card-title>
      <v-card-text> Please enter your mailing address and your password </v-card-text>
      <v-form>
        <v-text-field v-model="email" label="E-mail address" name="Email"> </v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="showPWLogin ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPWLogin ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          @click:append="showPWLogin = !showPWLogin"
        >
        </v-text-field>
        <v-row>
          <v-btn class="mx-2 my-4" @click="login"> Login </v-btn>
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
      password: '',
      email: '',
    };
  },
  methods: {
    login: () => {
      console.log('Hello there, General Kenobi');
      const { password, email } = this.data;
      console.log(`${password} and ${email}`);
      this.store
        .dispatch('login', { email, password })
        .then(() => this.router.push('/configurator'))
        .catch((err) => console.log(err));
    },
  },
};
</script>
