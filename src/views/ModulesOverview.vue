<template>
  <div class="modules">
    <v-btn
      fixed
      large
      rounded
      bottom
      right
      color="primary"
      :to="{ path: '/impcreator' }"
      v-if="$store.getters.isAuthenticated"
    >
      <v-icon left>mdi-plus</v-icon> CREATE
    </v-btn>
    <Modules />
  </div>
</template>

<script>
// @ is an alias to /src
import Modules from '../components/Modules.vue';

export default {
  name: 'Home',
  components: {
    Modules,
  },
};
</script>
