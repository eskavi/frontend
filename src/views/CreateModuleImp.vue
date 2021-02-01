<template>
  <div class="configurator">
    <v-container>
      <ModuleImpStepper />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import ModuleImpStepper from '../components/ModuleImpStepper.vue';

export default {
  name: 'CreateModuleImp',
  components: {
    ModuleImpStepper,
  },
};
</script>
