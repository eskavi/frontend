<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">
          Change Password
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Change Password</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Old Password*"
                  type="password"
                  required
                  hint="Type your old password."
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="New Password*"
                  type="password"
                  required
                  hint="Type your new password."
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="New Password*"
                  type="password"
                  required
                  hint="Retype your new password."
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'ChangePassword',

  data: () => ({}),
};
</script>
