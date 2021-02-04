<template>
  <v-container>
    <v-row justify="center" class="ma-5">
      <v-card width="50%">
        <v-card-title>Account Settings</v-card-title>

        <div class="mx-auto text-center">
          <v-avatar color="brown" size="70">
            <span class="white--text headline">{{
              $store.state.user.email.substring(0, 2).toUpperCase()
            }}</span>
          </v-avatar>
          <h3 class="ma-2">{{ $store.state.user.email }}</h3>
          <v-chip>Opa</v-chip>
          <v-chip>Administrator</v-chip>
        </div>
        <div class="mx-auto text-center ma-10">
          <ChangePassword /><br />
          <Logout /><br />
          <DeleteAccount class="ma-2" />
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import ChangePassword from './ChangePassword.vue';
import Logout from './Logout.vue';
import DeleteAccount from './DeleteAccount.vue';

export default {
  name: 'AccountSettings',
  components: {
    ChangePassword,
    Logout,
    DeleteAccount,
  },
};
</script>
