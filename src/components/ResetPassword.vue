<template>
  <v-row justify="center">
    <v-dialog v-model="displayDialog" max-width="600px" class="my-4">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="error" v-bind="attrs" v-on="on">Reset Password</v-btn>
      </template>
      <v-card class="8-px">
        <v-card-title>Reset Password</v-card-title>
        <v-form v-model="valid" ref="form" @submit.prevent="submit">
          <v-card-text>
            <v-alert type="error" v-if="error">{{ error }}</v-alert>
            <v-text-field label="Email address" name="Email" required v-model="email">
            </v-text-field>
            <v-btn @click="fetchSecurityQuestion">Get security Question</v-btn>
            <v-text-field
              label="Security question"
              name="secQuestion"
              v-model="securityQuestion"
              :disabled="true"
            >
            </v-text-field>
            <v-text-field
              label="Security answer"
              name="secQuestion"
              required
              v-model="securityAnswer"
              :disabled="answerEnable"
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
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      displayDialog: '',
      valid: '',
      error: '',
      securityQuestion: '',
      securityAnswer: '',
      newPassword: '',
      email: '',
      answerEnable: false,
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
          this.$refs.form.reset();
          this.displayDialog = false;
        })
        .catch((err) => {
          this.error = err.response.data.error || err;
        });
    },
    fetchSecurityQuestion() {
      axios
        .get('user/security_question', this.email)
        .then((message) => {
          this.securityQuestion = message.response.data.securityQuestion;
          this.answerEnable = true;
        })
        .catch((err) => {
          this.error = err.response.data.error || err;
        });
    },
  },
};
</script>
