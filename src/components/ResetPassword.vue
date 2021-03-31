<template>
  <v-dialog v-model="displayDialog" max-width="600px" class="my-4">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="error" text v-bind="attrs" v-on="on">Reset Password</v-btn>
    </template>
    <v-card class="8-px">
      <v-card-title>Reset Password</v-card-title>
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <v-alert type="error" v-if="error">{{ error }}</v-alert>

            <v-form v-model="validEmail" ref="parseQuestionForm" @submit.prevent="next">
              <v-text-field label="Email" name="Email" required v-model="email" :rules="emailRules">
              </v-text-field>
              <span class="caption grey--text text--darken-1">
                Enter the email you registered with to reset your password.
              </span>
            </v-form>
          </v-card-text>
        </v-window-item>
        <v-window-item :value="2">
          <v-card-text>
            <v-alert type="error" v-if="error">{{ error }}</v-alert>

            <v-form v-model="validAnswer" ref="resetPasswordForm" @submit.prevent="next">
              <v-text-field
                label="Security question"
                name="secQuestion"
                v-model="securityQuestion"
                :rules="questionRule"
                required
                readonly
              >
              </v-text-field>
              <v-text-field
                label="Security answer"
                name="secAnswer"
                required
                :rules="answerRule"
                v-model="securityAnswer"
              >
              </v-text-field>
              <v-text-field
                label="New Password"
                name="newPassword"
                v-model="newPassword"
                type="password"
                :rules="passwordRule"
                required
                hint="Type your new password."
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn :disabled="step === 1" text @click="step--">
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="step === 3" color="primary" depressed @click="next">
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      step: 1,
      validEmail: false,
      validAnswer: false,
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
            this.step = 1;
            this.error = '';
          })
          .catch((err) => {
            this.error = err.response.data.message || err;
          });
      }
    },
    fetchSecurityQuestion() {
      return new Promise((resolve, reject) => {
        if (this.$refs.parseQuestionForm.validate()) {
          axios
            .get('user/security_question', {
              params: {
                email: this.email,
              },
            })
            .then((message) => {
              this.securityQuestion = message.data.securityQuestion;
              this.error = '';
              resolve();
            })
            .catch((err) => {
              this.error = err.response.data.message || err;
              reject();
            });
        }
      });
    },
    next() {
      if (this.step === 1) {
        this.fetchSecurityQuestion().then(() => {
          this.step += 1;
        });
      } else {
        this.resetPassword();
      }
    },
  },
  watch: {
    displayDialog: {
      handler(status) {
        if (!status) {
          this.error = '';
        }
      },
    },
  },
};
</script>
