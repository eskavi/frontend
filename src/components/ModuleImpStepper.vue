<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="9">
        <v-stepper v-model="stepper" alt-labels>
          <v-stepper-header>
            <v-stepper-step
              :complete="stepper > 1"
              step="1"
              @click="stepper = stepper > 1 ? 1 : stepper"
            >
              Basic Details
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="stepper > 2"
              step="2"
              @click="stepper = stepper > 2 ? 2 : stepper"
            >
              Attributes
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="stepper > 3"
              step="3"
              @click="stepper = stepper > 3 ? 3 : stepper"
            >
              Configuration
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              step="4"
              :complete="stepper > 4"
              @click="stepper = stepper > 4 ? 4 : stepper"
            >
              Access
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="5" :complete="stepper > 4">
              Done
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-alert type="error" v-if="error">{{ error }}</v-alert>
              <v-form
                ref="basicDetails"
                @submit.prevent="submitBasicDetails"
                v-model="validBasicDetails"
              >
                <v-container>
                  <v-row justify="space-between">
                    <v-col cols="12" md="5">
                      <v-text-field
                        :counter="20"
                        :rules="basicPage.nameRules"
                        label="Name"
                        v-model="basicPage.name"
                        required
                        hint="Name your implementation"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-text-field
                        label="Author"
                        required
                        readonly
                        hint="Cannot be changed"
                        v-model="$store.state.user.email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-autocomplete
                        @change="getTemplates"
                        no-data-text="Not a valid implementation type"
                        label="Type"
                        hint="Choose the type"
                        :items="basicPage.impTypes"
                        v-model="basicPage.impType"
                        :rules="basicPage.impTypeRules"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-autocomplete
                        no-data-text="Not a valid template"
                        label="Template"
                        clearable
                        hint="Choose a template"
                        :item-text="(item) => item.name"
                        :items="this.basicPage.templates"
                        v-model="wipImp"
                        return-object
                        :disabled="!basicPage.impType"
                      >
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>
                <v-btn color="primary" type="submit">
                  Continue
                </v-btn>

                <v-btn text :to="{ path: '/modules' }">
                  Cancel
                </v-btn>
              </v-form>
            </v-stepper-content>

            <v-stepper-content step="2">
              <!-- TODO textField disappears when empty-->
              <v-alert type="error" v-if="error">{{ error }}</v-alert>
              <v-form
                ref="attributes"
                v-if="this.wipImp"
                @submit.prevent="submitAttributes"
                v-model="validAttributes"
              >
                <v-row justify="space-between">
                  <v-col cols="12" md="5">
                    <v-text-field
                      required
                      v-if="wipImp.hasOwnProperty('name')"
                      v-model="wipImp.name"
                      label="Name of the Module Implementation"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="5">
                    <v-text-field
                      v-if="wipImp.hasOwnProperty('author')"
                      v-model="wipImp.author"
                      label="Name of the Module Developer"
                      disabled
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-divider class="ma-4"></v-divider>
                <v-row>
                  <v-col cols="12" md="5">
                    <v-autocomplete
                      v-if="wipImp.hasOwnProperty('messageType')"
                      v-model="wipImp.messageType"
                      label="Pick the corresponding Message Type"
                      no-data-text="No valid template"
                      clearable
                      :item-text="(item) => item.name"
                      :items="this.attributesPage.messageTypes"
                      return-object
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="5">
                    <v-autocomplete
                      v-if="wipImp.hasOwnProperty('protocolType')"
                      v-model="wipImp.protocolType"
                      label="Pick the corresponding Protocol Type"
                      no-data-text="No valid template"
                      clearable
                      :item-text="(item) => item.name"
                      :items="this.attributesPage.protocolTypes"
                      return-object
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-form>
              <v-btn color="primary" @click="stepper = 3">
                Continue
              </v-btn>
              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-alert type="error" v-if="error">{{ error }}</v-alert>
              <v-row v-if="this.configurationRoot" justify="center" class="mb-4">
                <title>Configuration for Module Implementation</title>
                <ConfigurationAggregate
                  v-bind:rootAggregate="this.configurationRoot"
                  :isInit="true"
                />
              </v-row>
              <v-btn color="primary" @click="stepper = 4">
                Continue
              </v-btn>

              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-alert type="error" v-if="error">{{ error }}</v-alert>
              <v-container>
                <v-form ref="access" @submit.prevent="submitAccess" v-model="validAttributes">
                  <v-row v-if="wipImp.scope">
                    <v-autocomplete
                      v-if="wipImp.scope"
                      v-model="wipImp.scope.impScope"
                      label="Select the publication scope of your Implementation"
                      :items="this.accessPage.impScopes"
                    >
                    </v-autocomplete>
                  </v-row>
                </v-form>
              </v-container>

              <v-btn color="primary" @click="stepper = 5">
                Continue
              </v-btn>

              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="5">
              <v-alert type="error" v-if="error">{{ error }}</v-alert>

              <v-container class="ma-4">
                <v-row>
                  <v-alert v-if="this.finalizePage.createSuccess" type="success">
                    {{ finalizePage.successMessage }}</v-alert
                  >
                </v-row>
                <v-row justify="center" v-if="!this.finalizePage.createSuccess">
                  <v-card-title>Finalize Module Creation</v-card-title>
                </v-row>
                <v-row justify="center" v-if="!this.finalizePage.createSuccess">
                  <v-btn color="primary" @click="createModuleImp">Create Implementation</v-btn>
                </v-row>
              </v-container>

              <v-card>
                <v-card-title> Add Users to the new Implementation: </v-card-title>
              </v-card>

              <v-divider class="ma-4" />

              <v-btn color="primary" :to="{ path: '/modules' }">
                Go back to modules
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import ConfigurationAggregate from './moduleImpCreate/ConfigurationAggregate.vue';

export default {
  name: 'ModuleImpStepper',
  data() {
    return {
      inputConfig: {},
      basicPage: {
        impType: '',
        impTypes: [],
        templates: [],
        name: '',
        nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 20 || 'Name must be less than 10 characters',
        ],
        impTypeRules: [(v) => !!v || 'Type is required'],
      },
      attributesPage: {
        messageTypes: [],
        protocolTypes: [],
      },
      accessPage: {
        impScopes: [],
      },
      finalizePage: {
        successMessage:
          'Your Implementation was created successfully. In order to modify it you can find it in your Module overview!',
        createSuccess: false,
      },
      validBasicDetails: false,
      validAttributes: false,
      wipImp: {},
      configurationRoot: null,
      error: '',
      stepper: 1,
    };
  },
  components: {
    ConfigurationAggregate,
  },
  methods: {
    getImplementationTypes() {
      axios
        .get('imp/types')
        .then((message) => {
          this.basicPage.impTypes = message.data.types.map((type) => type.name);
        })
        .catch((err) => {
          this.error = `Issue fetching data from API: ${err.response.data.error}`;
        });
    },
    getTemplates() {
      console.log(this.basicPage.impType);
      // TODO catch error
      axios.get(`imp?impType=${this.basicPage.impType}`).then((imp) => {
        console.log(imp);
        this.basicPage.templates = imp.data.implementations;
      });
    },
    submitBasicDetails() {
      if (this.$refs.basicDetails.validate()) {
        this.stepper = 2;
        this.buildUpAttributesPage();
      }
    },
    submitAttributes() {
      if (this.$refs.attributes.validate()) {
        this.stepper = 3;
      }
    },
    buildUpAttributesPage() {
      this.configurationRoot = this.wipImp.configurationRoot;
      this.getMessageTypes();
      this.getProtocolTypes();
      this.getImpScopes();
    },
    getMessageTypes() {
      axios.get(`imp?type=MESSAGE_TYPE`).then((res) => {
        this.attributesPage.messageTypes = res.data.implementations;
      });
    },
    getProtocolTypes() {
      axios.get(`imp?type=PROTOCOL_TYPE`).then((imp) => {
        this.attributesPage.protocolTypes = imp.data.implementations;
      });
    },
    getImpScopes() {
      axios.get('imp/scopes').then((imp) => {
        this.accessPage.impScopes = imp.data.impScopes;
      });
    },
    createModuleImp() {
      this.wipImp.configurationRoot = this.configurationRoot;
      console.log(this.wipImp);
      axios
        .post('imp', this.wipImp)
        .then((res) => {
          console.log(res);
          this.finalizePage.createSuccess = true;
        })
        .catch((err) => {
          this.error = err.respone.data.error;
        });
    },
  },
  computed: {},
  watch: {},
  mounted() {
    this.getImplementationTypes();
  },
};
</script>
