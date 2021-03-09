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
              <v-combobox
                v-model="registryURLs"
                :rules="registryRules"
                label="Registry URLs"
                hint="Enter URL. Press enter to add."
                deletable-chips
                multiple
                chips
              ></v-combobox>
            </v-col>
          </v-row>
          <v-row justify="space-between" class="mt-10">
            <v-col cols="12" md="5" v-for="module in modules" :key="module.type">
              <v-autocomplete
                no-data-text="Not a valid module"
                :rules="[impRules.max(module.maxUse)]"
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
        <v-alert type="error" v-if="error">{{ error }}</v-alert>
        <v-btn color="primary" @click="submitConfigurationPage(configurationPage)">
          Continue
        </v-btn>
        <v-btn text @click="reloadPage">
          Cancel
        </v-btn>
      </v-stepper-content>
    </div>

    <!-- file generation page -->
    <v-stepper-step :step="configurationPages.length + 2">
      Generation
    </v-stepper-step>
    <v-stepper-content :step="configurationPages.length + 2">
      <v-alert type="error" v-if="error">{{ error }}</v-alert>
      <v-row justify="center" class="mt-5">
        <v-btn
          color="primary"
          :loading="loadFile"
          :disabled="this.fileURL == ''"
          @click="downloadFile"
          ><v-icon left>mdi-download</v-icon> Download File</v-btn
        >
      </v-row>
      <v-row justify="center" class="ma-10">
        <v-btn text @click="reloadPage">Configure another AAS</v-btn>
      </v-row>
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
      registryRules: [(v) => v.length > 0 || 'At least 1 registry URL is required'],
      path: '',
      registryURLs: [],
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
      fileURL: '',
    };
  },
  methods: {
    async submitBasicDetails() {
      if (this.$refs.basicDetails.validate()) {
        this.error = '';
        const queryRegistryURLs = new Promise((resolve, reject) => {
          // now add registry URLs
          axios
            .post('aas/registry', {
              sessionId: this.sessionId,
              url: this.registryURLs,
            })
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        });

        // proceed only if all axios calls were successful
        Promise.all([queryRegistryURLs, this.queryModules()])
          .then(() => {
            this.page += 1;
          })
          .catch((err) => {
            this.error = err.response.data.error || err;
          });
      }
    },
    queryModules() {
      // try to add selected moduleimps to session
      return new Promise((resolve, reject) => {
        this.modules.forEach((selector, outerIndex) => {
          selector.value.forEach((value, innerIndex) => {
            axios
              .post('aas/imp', {
                sessionId: this.sessionId,
                impId: value.id,
              })
              // TODO: timing doesnt seem to be right here.
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
                  configuration: configuration.data.instanceConfiguration,
                });
                console.log(`ID: ${value.id} Data: ${configuration.data}`);
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
    },
    submitConfigurationPage(instance) {
      // make axios call to update config of module
      console.log({
        sessionId: this.sessionId,
        impId: instance.id,
        configuration: instance.configuration,
      });
      axios
        .put('/aas/imp/configuration', {
          sessionId: this.sessionId,
          impId: instance.id,
          configuration: instance.configuration,
        })
        .then(() => {
          this.page += 1;
          this.error = '';
        })
        .catch((err) => {
          this.error = err.response.data.error || err;
        });
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
        })
        .catch(() => {
          this.$store.dispatch('sendActionResponse', "Could'nt start session. Try again.");
        });
    },
    closeSession() {
      axios
        .delete('aas', {
          params: {
            sessionId: this.sessionId,
          },
        })
        .catch(() => {
          this.$store.dispatch('sendActionResponse', "Could'nt close session.");
        });
    },
    generateFile() {
      // start loading animation
      this.loadFile = true;
      axios
        .get('aas/generate', {
          params: {
            sessionId: this.sessionId,
          },
        })
        .then((response) => {
          const file = new Blob([response.data]);
          this.fileURL = URL.createObjectURL(file);
          this.closeSession();
          this.loadFile = false;
        });
    },
    downloadFile() {
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', this.fileURL);
      linkElement.setAttribute('download', 'aas.java');
      document.body.appendChild(linkElement);
      linkElement.click();
      document.body.removeChild(linkElement);
    },
    reloadPage() {
      window.location.reload();
    },
  },
  watch: {
    page: {
      handler(p) {
        if (p === this.configurationPages.length + 2) {
          this.generateFile();
        }
      },
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
