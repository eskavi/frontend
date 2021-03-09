<template>
  <div class="registration">
    <v-card class="px-8">
      <v-card-title> Register </v-card-title>
      <v-card-text> Create a new user account.</v-card-text>
      <v-alert type="error" v-if="showError"> Error. You could not be registered.</v-alert>
      <v-form @submit.prevent="registerUser" ref="registerForm">
        <v-text-field
          label="E-Mail Address"
          name="Email"
          v-model="newUser.email"
          :rules="emailRule"
        >
        </v-text-field>
        <v-select
          label="Security Question"
          hint="Select Security Question"
          :items="questions"
          v-model="newUser.securityQuestion"
          :rules="questionRule"
        ></v-select>
        <v-text-field
          label="Security Answer"
          hint="Answer the selected security question."
          :rules="answerRule"
          v-model="newUser.securityAnswer"
        ></v-text-field>
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
        <v-row>
          <v-col>
            <v-btn class="mx-2 my-8" type="submit"> Register </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Authentication',

  data() {
    return {
      showPW: false,
      showPWRepeat: false,
      showError: false,
      passwordRepeat: '',
      errMessage: '',
      questions: [],
      newUser: {
        email: '',
        password: '',
        securityQuestion: '',
        securityAnswer: '',
      },
    };
  },
  methods: {
    registerUser() {
      if (this.$refs.registerForm.validate()) {
        this.$store
          .dispatch('registerNewUser', this.newUser)
          .then(() => {
            console.log('Success');
            this.$store.dispatch('sendActionResponse', 'You are now registered and logged in.');
            this.$router.push('/configurator');
          })
          .catch(() => {
            console.log('error');
            this.showError = true;
          });
      }
    },
    loadSecurityQuestions() {
      axios
        .get('/user/questions')
        .then((response) => {
          this.questions = response.data;
        })
        .catch(() => {
          this.$store.dispatch(
            'sendActionResponse',
            "Could'nt load security questions. Refresh page and try again.",
          );
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
    emailRule() {
      return [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ];
    },
    questionRule() {
      return [(v) => !!v || 'Choose a security question'];
    },
    answerRule() {
      return [(v) => !!v || 'Answer the security question'];
    },
  },
  mounted() {
    this.loadSecurityQuestions();
  },
};
</script>
