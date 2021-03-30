<template>
  <v-row justify="center">
    <v-card width="90%" class="mx-2 pa-3">
      <v-avatar size="28" rounded v-if="this.instanceSelectField.allowMultiple">
        <v-btn class="error" @click="$emit('deleteThis', instanceSelectField)"
          ><v-icon> mdi-close</v-icon></v-btn
        >
      </v-avatar>
      <v-avatar size="28" rounded v-if="this.instanceSelectField.allowMultiple" class="ml-1">
        <v-btn class="success" @click="$emit('addThis', instanceSelectField)"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-avatar>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-autocomplete
            :loading="loadModules"
            :items="modules"
            v-model="selected"
            no-data-text="Not a valid instance"
            :label="instanceSelectField.name"
            return-object
            :item-text="(item) => `${item.name}#${item.implementationId}`"
            @change="loadConfiguration"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FillInInstanceSelectConfiguration',
  props: {
    instanceSelectField: Object,
    sessionId: Number,
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
      console.log(`SessionId is ${this.sessionId}`);
      this.instanceSelectField.instance = {
        moduleImp: '',
        instanceConfiguration: null,
      };
      // load available modules
      axios
        .get(
          `/aas/toplevelimps?${this.instanceSelectField.generics
            .map((element) => `generics=${element.implementationId}`)
            .join('&')}&impType=${this.instanceSelectField.type}`,
        )
        .then((res) => {
          this.modules = res.data.implementations;
          this.loadModules = false;
        });
    },
    loadConfiguration() {
      // set id of selected module
      this.implementationSelectField.moduleImp = this.selected;
    },
  },
  mounted() {
    this.onBuildUp();
  },
};
</script>
