<template>
  <v-row justify="center">
    <v-dialog v-model="displayDialog" max-width="600px" class="my-4">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="error" v-bind="attrs" v-on="on">Reset Password</v-btn>
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
          <v-text-field
            label="Security question"
            name="secQuestion"
            v-model="securityQuestion"
            readonly
          >
          </v-text-field>
          <v-text-field
            label="Security answer"
            name="secQuestion"
            required
            v-model="securityAnswer"
          >
          </v-text-field>
          <v-text-field
            label="New Password"
            v-model="newPassword"
            type="password"
            required
            hint="Type your new password."
          ></v-text-field>
          <v-btn @click="resetPassword">Confirm reset</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      validEmail: false,
      displayDialog: '',
      error: '',
      securityQuestion: '',
      securityAnswer: '',
      newPassword: '',
      email: '',
      emailRules: [(v) => !!v || 'Email is required'],
    };
  },
  methods: {
    resetPassword() {
      axios
        .post('user/reset_password', {
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
    },
    fetchSecurityQuestion() {
      if (this.$refs.parseQuestionForm.validate()) {
        axios
          .get('user/security_question', { email: this.email })
          .then((message) => {
            this.securityQuestion = message.data.security_question;
          })
          .catch((err) => {
            this.error = err.response.data.error || err;
          });
      }
    },
  },
};
</script>
