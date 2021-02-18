<template>
  <v-stepper v-model="page" vertical>
    <!-- basic details page -->
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
              <!-- :rules="[impRules.max(module.maxUse)]" -->
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
                :counter="module.maxUse"
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

    <!-- configuration pages -->
    <div v-for="(configurationPage, index) in configurationPages" :key="configurationPage.name">
      <v-stepper-step :complete="page > index + 2" :step="index + 2">
        {{ configurationPage.name }}
      </v-stepper-step>

      <v-stepper-content :step="index + 2">
        <span>Please provide the following details to configure the selected module.</span>
        <FillInConfigurationAggregate
          v-bind:rootAggregate="configurationPage.configuration"
          v-bind:key="index"
        />
        <v-btn color="primary" @click="page = index + 3">
          Continue
        </v-btn>
        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>
    </div>

    <!-- file generation page -->
    <v-stepper-step :step="configurationPages.length + 2">
      Generation
    </v-stepper-step>
    <v-stepper-content :step="configurationPages.length + 2">
      <v-row justify="center" class="mt-5">
        <v-btn color="primary" :loading="loadFile" @click="downloadFile"
          ><v-icon left>mdi-download</v-icon> Download File</v-btn
        >
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
import FillInConfigurationAggregate from './configurator/FillInConfigurationAggregate.vue';

export default {
  name: 'ConfiguratorStepper',
  components: {
    FillInConfigurationAggregate,
  },
  data() {
    return {
      sessionId: '',
      error: '',
      page: 1,
      pathRules: [(v) => !!v || 'Path is required'],
      path: '',
      impRules: {
        max(maxUse) {
          if (maxUse === 'infinite') {
            return (v) => v.length > 0 || 'Choose a module';
          }
          return (v) =>
            (v.length > 0 && v.length <= maxUse) ||
            `Choose minimum 1 and  maximum ${maxUse} modules`;
        },
      },
      modules: [],
      configurationPages: [
        /* {
          name: 'Configure Endpoint',
          configurationTemplate: {},
        },
        {
          name: 'Configure Handler',
        }, */
      ],
      loadFile: false,
    };
  },
  methods: {
    async submitBasicDetails() {
      if (this.$refs.basicDetails.validate()) {
        this.error = '';
        // add selected moduleImps to current session
        const queryModules = new Promise((resolve, reject) => {
          this.modules.forEach((selector, outerIndex) => {
            selector.value.forEach((value, innerIndex) => {
              axios
                .post('aas/imp', {
                  sessionId: this.sessionId,
                  impId: value.id,
                })
                .then(() =>
                  axios.get('aas/imp/configuration', {
                    params: {
                      sessionId: this.sessionId,
                      impId: value.id,
                    },
                  }),
                )
                .then((configuration) => {
                  this.configurationPages.push({
                    name: `Configure ${value.name}.`,
                    id: value.id,
                    configuration: configuration.data,
                  });
                  if (
                    outerIndex === this.modules.length - 1 &&
                    innerIndex === selector.value.length - 1
                  ) {
                    resolve();
                  }
                })
                .catch((err) => {
                  reject(err);
                });
            });
          });
        });
        // proceed only if all axios calls were successful
        queryModules
          .then(() => {
            this.page += 1;
          })
          .catch((err) => {
            this.error = err.response.data.error || err;
          });
      }
    },
    loadAvailableImps() {
      // first get all possible types to check for topLevel module imps
      axios
        .get('imp/types')
        .then((types) => {
          const topLevel = types.data.types.filter((type) => type.topLevel);
          // create dropdown for each top level module imp type
          topLevel.forEach((type) => {
            this.modules.push({
              type: type.name,
              maxUse: type.maxUse !== -1 ? type.maxUse : 'infinite',
              value: [],
              items: [],
            });
          });
          // now load modules
          axios.get('imp').then((response) => {
            console.log(response);
            response.data.implementations
              .filter((imp) => topLevel.map((type) => type.name).indexOf(imp.jsonTypeInfo) >= 0)
              .forEach((imp) => {
                const pushData = {
                  name: imp.name,
                  id: imp.implementationId,
                  author: imp.author,
                };
                // add item to dropdown
                this.modules.find((entry) => entry.type === imp.jsonTypeInfo).items.push(pushData);
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
    downloadFile() {
      // start loading animation
      this.loadFile = true;
      axios
        .get('aas/file', {
          params: {
            sessionId: this.sessionId,
          },
        })
        .then((response) => {
          const file = new Blob([JSON.stringify(response.data)], { type: 'application/json' });
          const fileURL = URL.createObjectURL(file);
          // create the link
          const linkElement = document.createElement('a');
          linkElement.setAttribute('href', fileURL);
          linkElement.setAttribute('download', 'aas.java');
          document.body.appendChild(linkElement);
          linkElement.click();
          this.loadFile = false;
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
