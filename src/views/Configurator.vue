<template>
  <div class="configurator">
    <v-container>
      <ConfiguratorStepper />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import ConfiguratorStepper from '../components/ConfiguratorStepper.vue';

export default {
  name: 'Home',
  components: {
    ConfiguratorStepper,
  },
};
</script>
