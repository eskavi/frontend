<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn depressed
        color="primary"
        :to="{ path: '/' }"
        :ripple="false">
          <h2>ESKAVI Web</h2>
        </v-btn>
      <v-spacer></v-spacer>
      <v-btn text :to="{ path: '/configurator' }">
        <v-icon left>mdi-wrench</v-icon>
        <span class="mr-2">Configurator</span>
      </v-btn>
      <v-btn text :to="{ path: '/modules' }">
        <v-icon left>mdi-view-module</v-icon>
        <span class="mr-2">Modules</span>
      </v-btn>
      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" :to="{ path: '/account' }">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <span>Account</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  }),
};
</script>
