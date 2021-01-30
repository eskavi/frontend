<template>
  <v-container class="home">
    <v-row justify="center" class="ma-5">
    <v-col class="px-3">
    <Authentication />
    </v-col>
    <v-col>
      <Registration/>
    </v-col>
    </v-row>
    <v-row justify="center" class="ma-5">
      <v-btn @click="redirectUser" class= "px-50">Continue without account</v-btn>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Authentication from '../components/Authentication.vue';
import Registration from '../components/Registration.vue';

export default {
  name: 'Home',
  components: {
    Authentication,
    Registration,
  },
  methods: {
    redirectUser() {
      this.$router.push('/configurator');
    },
  },
};
</script>
