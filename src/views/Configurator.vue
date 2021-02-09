<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <ConfiguratorStepper />
      </v-col>
    </v-row>
  </v-container>
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
