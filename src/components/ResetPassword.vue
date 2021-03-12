<template>
  <v-dialog v-model="displayDialog" max-width="600px" class="my-4">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="error" text v-bind="attrs" v-on="on">Reset Password</v-btn>
    </template>
    <v-card class="8-px">
      <v-card-title>Reset Password</v-card-title>
      <v-card-text>
        <v-alert type="error" v-if="error">{{ error }}</v-alert>
        <v-form
          v-model="validEmail"
          ref="parseQuestionForm"
          @submit.prevent="fetchSecurityQuestion"
        >
          <v-text-field
            label="Email address"
            name="Email"
            required
            v-model="email"
            :rules="emailRules"
          >
          </v-text-field>
          <v-btn @click="fetchSecurityQuestion">Get security Question</v-btn>
        </v-form>
        <v-form @submit.prevent="resetPassword" ref="resetPasswordForm">
          <v-text-field
            label="Security question"
            name="secQuestion"
            v-model="securityQuestion"
            :rules="questionRule"
            readonly
          >
          </v-text-field>
          <v-text-field
            label="Security answer"
            name="secQuestion"
            required
            :rules="answerRule"
            v-model="securityAnswer"
          >
          </v-text-field>
          <v-text-field
            label="New Password"
            v-model="newPassword"
            type="password"
            :rules="passwordRule"
            required
            hint="Type your new password."
          ></v-text-field>
          <v-btn @click="resetPassword">Confirm reset</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      validEmail: false,
      displayDialog: false,
      error: '',
      securityQuestion: '',
      securityAnswer: '',
      newPassword: '',
      email: '',
      emailRules: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRule: [(v) => !!v || 'Enter a password please'],
      questionRule: [(v) => !!v || 'Choose a security question'],
      answerRule: [(v) => !!v || 'Answer the security question'],
    };
  },
  methods: {
    resetPassword() {
      if (this.$refs.resetPasswordForm.validate()) {
        axios
          .post('user/reset_password', {
            email: this.email,
            answer: this.securityAnswer,
            newPassword: this.newPassword,
          })
          .then(() => {
            this.$store.dispatch('sendActionResponse', 'Your password was updated successfully!');
            this.securityQuestion = '';
            this.newPassword = '';
            this.email = '';
            this.securityAnswer = '';
            this.displayDialog = false;
          })
          .catch((err) => {
            this.error = err.response.data.error || err;
          });
      }
    },
    fetchSecurityQuestion() {
      if (this.$refs.parseQuestionForm.validate()) {
        axios
          .get('user/security_question', {
            params: {
              email: this.email,
            },
          })
          .then((message) => {
            this.securityQuestion = message.data.securityQuestion;
          })
          .catch((err) => {
            this.error = err.response.data.error || err;
          });
      }
    },
  },
  watch: {
    displayDialog: {
      handler(status) {
        if (!status) {
          this.$refs.parseQuestionForm.reset();
          this.$refs.resetPasswordForm.reset();
          this.error = '';
        }
      },
    },
  },
};
</script>
