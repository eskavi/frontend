<template>
  <v-stepper v-model="page" vertical>
    <v-stepper-step :complete="page > 1" step="1" @click="page = page > 1 ? 1 : page">
      Basic Details
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-form ref="basicDetails" @submit.prevent="submitBasicDetails">
        <v-container>
          <v-row justify="space-between">
            <v-col cols="12" md="5">
              <v-text-field
                :rules="pathRules"
                label="Path"
                v-model="path"
                required
                hint="Specify path"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="space-between" class="mt-10">
            <v-col cols="12" md="5" v-for="module in modules" :key="module.type">
              <v-autocomplete
                no-data-text="Not a valid module"
                :label="module.type"
                deletable-chips
                :items="module.items"
                v-model="module.value"
                multiple
                chips
                :rules="impRules"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
        <v-btn color="primary" type="submit">
          Continue
        </v-btn>
        <v-btn text @click="$refs.basicDetails.reset()">
          Reset
        </v-btn>
      </v-form>
    </v-stepper-content>

    <div v-for="configurationPage in configurationPages" :key="configurationPage.name">
      <v-stepper-step :complete="page > 2" step="2">
        {{ configurationPage.name }}
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn color="primary" @click="page = 3">
          Continue
        </v-btn>
        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>
    </div>

    <v-stepper-step :complete="page > 3" step="3">
      Select an ad format and name ad unit
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="primary" @click="page = 4">
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4" @click="page = page > 4 ? 4 : page">
      Generation
    </v-stepper-step>
    <v-stepper-content step="4">
      <v-row justify="center">
        <v-progress-circular :size="100" :width="15" :value="progress" color="primary" class="mt-5">
          {{ progress }}
        </v-progress-circular>
      </v-row>
      <v-row justify="center">
        <span class="mt-2">Generating file...</span>
      </v-row>
      <v-btn color="primary" @click="page = 1">
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
export default {
  name: 'ConfiguratorStepper',
  data() {
    return {
      page: 1,
      pathRules: [(v) => !!v || 'Path is required'],
      path: '',
      impRules: [(v) => v.length > 0 || 'Choose a module'],
      modules: [
        {
          type: 'Endpoint',
          value: [],
          items: ['IC2', 'Whatever'],
        },
        {
          type: 'Handler',
          value: [],
          items: ['IC2', 'Cool'],
        },
      ],
      configurationPages: [
        {
          name: 'Configure Endpoint',
        },
        {
          name: 'Configure Handler',
        },
      ],
      progress: 25,
    };
  },
  methods: {
    submitBasicDetails() {
      if (this.$refs.basicDetails.validate()) {
        const step = this.page;
        this.page = step + 1;
      }
    },
  },
  watch: {
    modules: {
      handler() {},
    },
  },
};
</script>
