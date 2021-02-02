<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">Change Password</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Change Password</span>
        </v-card-title>
        <v-form v-model="valid" ref="form" @submit.prevent="submit">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Old Password*"
                    v-model="oldPassword"
                    type="password"
                    required
                    :rules="oldPasswordRules"
                    hint="Type your old password."
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="New Password*"
                    v-model="newPassword"
                    type="password"
                    required
                    :rules="newPasswordRules"
                    hint="Type your new password."
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="New Password*"
                    type="password"
                    required
                    :rules="newPasswordAgainRules"
                    v-model="newPasswordAgain"
                    hint="Retype your new password."
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text type="submit">
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'ChangePassword',

  data() {
    return {
      dialog: false,
      valid: false,
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    };
  },
  computed: {
    newPasswordAgainRules() {
      return [(v) => (!!v && v) === this.newPassword || 'Passwords do not match'];
    },
    oldPasswordRules() {
      return [(v) => !!v || 'Old Password required'];
    },
    newPasswordRules() {
      return [(v) => !!v || 'New Password required'];
    },
  },
  methods: {
    close() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.$refs.form.reset();
        this.dialog = false;
        // change user password
        this.$store.dispatch('sendActionResponse', 'Your password has been changed.');
      }
    },
  },
};
</script>
