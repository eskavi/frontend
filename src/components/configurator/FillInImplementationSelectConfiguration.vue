<template>
  <v-row justify="center">
    <v-card width="90%" class="mx-2 pa-3">
      <v-avatar size="28" rounded v-if="this.implementationSelectField.allowMultiple">
        <v-btn class="error" @click="$emit('deleteThis', implementationSelectField)"
          ><v-icon> mdi-close</v-icon></v-btn
        >
      </v-avatar>
      <v-avatar size="28" rounded v-if="this.implementationSelectField.allowMultiple" class="ml-1">
        <v-btn class="success" @click="$emit('addThis', implementationSelectField)"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-avatar>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-autocomplete
            :loading="loadModules"
            :items="modules"
            v-model="selected"
            no-data-text="Not a valid module"
            :label="implementationSelectField.name"
            return-object
            :item-text="(item) => `${item.name}#${item.implementationId}`"
            @change="loadConfiguration"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row justify="center">
        <FillInConfigurationAggregate
          v-if="
            implementationSelectField.instance &&
              implementationSelectField.instance.instanceConfiguration
          "
          v-bind:rootAggregate="implementationSelectField.instance.instanceConfiguration"
        />
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FillInImplementationSelectConfiguration',
  props: {
    implementationSelectField: Object,
  },
  components: {
    FillInConfigurationAggregate: () => import('./FillInConfigurationAggregate.vue'),
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
      this.implementationSelectField.instance = {
        moduleImp: '',
        instanceConfiguration: null,
      };
      // load available modules
      const call =
        this.implementationSelectField.generics.length > 0
          ? `/imp?${this.implementationSelectField.generics
              .map((element) => `generics=${element.implementationId}`)
              .join('&')}&impType=${this.implementationSelectField.type}`
          : `/imp?impType=${this.implementationSelectField.type}`;
      axios.get(call).then((res) => {
        this.modules = res.data.implementations;
        this.loadModules = false;
      });
    },
    loadConfiguration() {
      // set id of selected module
      this.implementationSelectField.instance.moduleImp = this.selected;

      // set configuration of selected module
      this.implementationSelectField.instance.instanceConfiguration = this.selected.configurationRoot;
    },
  },
  mounted() {
    this.onBuildUp();
  },
};
</script>
