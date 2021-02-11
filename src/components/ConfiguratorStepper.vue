<template>
  <v-stepper v-model="page" vertical>
    <v-stepper-step :complete="page > 1" step="1">
      Basic Details
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-form ref="basicDetails" @submit.prevent="submitBasicDetails">
        <v-alert type="error" v-if="error">{{ error }}</v-alert>
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
                :item-text="(item) => `${item.name}#${item.id}`"
                v-model="module.value"
                multiple
                chips
                return-object
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

    <v-stepper-step step="4">
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
import axios from 'axios';

export default {
  name: 'ConfiguratorStepper',
  data() {
    return {
      sessionId: '',
      error: '',
      page: 1,
      pathRules: [(v) => !!v || 'Path is required'],
      path: '',
      impRules: [(v) => v.length > 0 || 'Choose a module'],
      modules: [],
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
        this.error = '';
        // add selected moduleImps to current session
        this.modules.forEach((selector) => {
          selector.value.forEach((value) => {
            axios
              .post('aas/imp', {
                sessionId: this.sessionId,
                impId: value.id,
              })
              .then((response) => console.log(response.data.message))
              .catch((err) => {
                this.error = err.response.data.error || err;
              });
          });
        });

        // proceed only if all axios calls were successful
        if (!this.error) {
          const step = this.page;
          this.page = step + 1;
        }
      }
    },
    loadConfigurationPages() {
      // TODO load configuration of imps from api and add them as pages in the stepper
    },
    loadAvailableImps() {
      // first get all possible types to check for topLevel module imps
      axios
        .get('imp/types')
        .then((types) => {
          const topLevel = types.data.types
            .filter((type) => type.topLevel)
            .map((type) => type.name);
          // now load modules
          axios.get('imp').then((response) => {
            response.data.implementations
              .filter((imp) => topLevel.indexOf(imp.type) >= 0)
              .forEach((imp) => {
                const pushData = {
                  name: imp.name,
                  id: imp.implementationId,
                  author: imp.author,
                };
                if (this.modules.find((entry) => entry.type === imp.type)) {
                  this.modules.find((entry) => entry.type === imp.type).items.push(pushData);
                } else {
                  this.modules.push({
                    type: imp.type,
                    value: [],
                    items: [pushData],
                  });
                }
              });
          });
        })
        .catch(() => {
          this.$store.dispatch('sendActionResponse', 'Error loading modules. Try again.');
        });
    },
    startSession() {
      axios
        .post('aas')
        .then((response) => {
          this.sessionId = response.data.sessionId;
          this.$store.dispatch('sendActionResponse', `Session ${response.data.sessionId} started.`);
        })
        .catch(() => {
          this.$store.dispatch('sendActionResponse', "Could'nt start session. Try again.");
        });
    },
    closeSession() {
      axios
        .delete('aas', {
          sessionId: this.sessionId,
        })
        .then((response) => {
          this.$store.dispatch('sendActionResponse', response.data.message);
        })
        .catch(() => {
          this.$store.dispatch('sendActionResponse', "Could'nt close session.");
        });
    },
  },
  watch: {
    modules: {
      handler() {},
    },
  },
  mounted() {
    this.startSession();
    this.loadAvailableImps();
  },
  unmounted() {
    this.closeSession();
  },
};
</script>
