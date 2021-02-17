<template>
  <v-row justify="center">
    <v-card width="90%" class="mx-2 pa-3">
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-autocomplete
            :loading="loadModules"
            :items="modules"
            v-model="selected"
            no-data-text="Not a valid module"
            :label="implementationSelectField.name"
            return-object
            :item-text="(item) => item.name"
            @change="loadConfiguration"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row justify="center">
        <FillInConfigurationAggregate
          v-if="implementationSelectField.instance.instanceConfiguration"
          v-bind:rootAggregate="implementationSelectField.instance.instanceConfiguration"
        />
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
import axios from 'axios';
import FillInConfigurationAggregate from './FillInConfigurationAggregate.vue';

export default {
  name: 'FillInImplementationSelectConfiguration',
  props: {
    implementationSelectField: Object,
  },
  components: {
    FillInConfigurationAggregate,
  },
  data() {
    return {
      modules: [],
      selected: Object,
      loadModules: true,
    };
  },
  methods: {
    onBuildUp() {
      console.log(this.implementationSelectField);
      // load available modules
      axios
        .get('/imp', {
          params: {
            type: this.implementationSelectField.type,
          },
        })
        .then((res) => {
          this.modules = res.data.implementations;
          this.loadModules = false;
        });
    },
    loadConfiguration() {
      // set id of selected module
      this.implementationSelectField.instance.moduleImp = this.selected.implementationId;

      // set configuration of selected module
      this.implementationSelectField.instance.instanceConfiguration = this.selected.configurationRoot;
    },
  },
  mounted() {
    this.onBuildUp();
  },
};
</script>
