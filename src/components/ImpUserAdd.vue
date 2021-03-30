<template>
  <v-container class="ma-4">
    <v-row>
      <v-card-title> Add Users to the new Implementation: </v-card-title>
    </v-row>
    <v-row>
      <v-alert :type="alertType" v-if="alertMessage">{{ alertMessage }}</v-alert>
      <v-col cols="12" md="10">
        <v-combobox
          v-model="usersAdded"
          label="Enter Email-Addresses of Users you'd like to give access permission."
          deletable-chips
          multiple
          chips
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn
        color="primary"
        v-if="!isEmbedded"
        :disabled="this.usersAdded.length < 1"
        @click="addUsersToImp"
      >
        Publish to Users</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    impId: {},
    addUserTrigger: Number,
    isEmbedded: Boolean,
  },
  data() {
    return {
      usersAdded: [],
      alertMessage: '',
      alertType: 'success',
    };
  },
  methods: {
    addUsersToImp() {
      const payload = { userIds: this.usersAdded, impId: this.impId };
      console.log(payload);
      if (this.usersAdded.length < 1) {
        console.log('No users to be added.');
        return;
      }
      axios
        .post('imp/user', payload)
        .then((res) => {
          console.log(res);
          this.alertType = 'success';
          this.alertMessage = 'Users added successfully to shared implementation!';
          this.usersAdded = [];
        })
        .catch((err) => {
          this.alertType = 'error';
          this.alertMessage = err.response.data.error;
        });
    },
  },
  watch: {
    addUserTrigger: {
      handler() {
        this.addUsersToImp();
      },
    },
  },
};
</script>
