<template>
  <v-container>
    <v-row justify="center" class="ma-5">
      <v-card width="50%">
        <v-card-title>Account Settings</v-card-title>

        <div class="mx-auto text-center">
          <v-avatar color="brown" size="70">
            <span class="white--text headline">MM</span>
          </v-avatar>
          <h3 class="ma-2">Manuel Müllerschön</h3>
          <v-chip>Opa</v-chip>
          <v-chip>Administrator</v-chip>
        </div>
        <div class="mx-auto text-center ma-10">
          <v-btn>Change Password</v-btn><br />
          <v-btn class="ma-3">Logout</v-btn><br />
          <v-btn class="error">Delete Account</v-btn>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>
