<template>
  <div id="Logout">
    <v-dialog v-model="dialog" max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="error" v-bind="attrs" v-on="on">
          Delete Account
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Are you sure?
        </v-card-title>
        <v-card-text
          >By deleting your user account all your personal data will be gone forever, including any
          module implementations you have created and/or shared in the past.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">
            Go back
          </v-btn>
          <v-btn color="error" text @click="deleteAccount">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'DeleteAccount',

  data: () => ({
    dialog: false,
  }),
  methods: {
    deleteAccount() {
      this.dialog = false;
      // delete account of authenticated user
      this.$router.push({ path: '/' });
    },
  },
};
</script>
