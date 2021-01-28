<template>
  <div class="home">
    <Authentication />
    <v-btn @click="redirectUser">Go to Configurator</v-btn>
  </div>
</template>

<script>
// @ is an alias to /src
import Authentication from '../components/Authentication.vue';

export default {
  name: 'Home',
  components: {
    Authentication,
  },
  methods: {
    redirectUser() {
      this.$router.push('/configurator');
    },
  },
};
</script>
