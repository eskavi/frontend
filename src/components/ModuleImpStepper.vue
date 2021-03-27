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
                        :rules="basicPage.nameRules"
                        label="Java Class Name"
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
                        required
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
              <ImpAttributesCard
                @cancelMod="leaveCreator"
                @stepperForward="stepper = 3"
                v-bind:wipImp="this.wipImp"
                v-if="stepper > 1"
              />
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

              <v-btn text @click="leaveCreator">
                Cancel
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="4">
              <ImpScopeCard
                @cancelMod="leaveCreator"
                @stepperForward="stepper++"
                v-bind:wipImp="this.wipImp"
                v-if="stepper > 1"
              />
            </v-stepper-content>

            <v-stepper-content step="5">
              <v-alert type="error" v-if="error">{{ error }}</v-alert>

              <v-container class="ma-4">
                <v-row>
                  <v-alert v-if="this.finalizePage.createSuccess" type="success">
                    {{ finalizePage.successMessage }}</v-alert
                  >
                </v-row>
                <v-row>
                  <v-alert v-if="this.finalizePage.useresAdded" type="success">
                    {{ finalizePage.addMessage }} {{ wipImp.name }}</v-alert
                  >
                </v-row>
                <v-row justify="center" v-if="!this.finalizePage.createSuccess">
                  <v-card-title>Finalize Module Creation</v-card-title>
                </v-row>
                <v-row justify="center" v-if="!this.finalizePage.createSuccess">
                  <v-btn color="primary" @click="createModuleImp">Create Implementation</v-btn>
                </v-row>
              </v-container>

              <v-container
                v-if="this.finalizePage.createSuccess && this.wipImp.scope.impScope === 'TODO'"
              >
                <ImpUserAdd />
              </v-container>

              <v-divider style="" class="ma-4" />
              <v-row class="ma-2">
                <v-btn
                  class="ma-2"
                  color="primary"
                  v-if="this.finalizePage.createSuccess"
                  :to="{ path: '/modules' }"
                >
                  Go back to modules
                </v-btn>
                <v-btn
                  text
                  @click="leaveCreator"
                  class="ma-2"
                  v-if="!this.finalizePage.createSuccess"
                >
                  Cancel
                </v-btn>
              </v-row>
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
import ImpAttributesCard from './ImpAttributesCard.vue';
import ImpScopeCard from './ImpScopeCard.vue';
import ImpUserAdd from './ImpUserAdd.vue';

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
        nameRules: [(v) => !!v || 'Name is required'],
        impTypeRules: [(v) => !!v || 'Type is required'],
      },
      finalizePage: {
        addedUsers: [],
        successMessage:
          'Your Implementation was created successfully. In order to modify it you can find it in your Module overview!',
        addMessage: 'Users successfully added to ',
        createSuccess: false,
        createdImpId: '',
        usersAdded: false,
      },
      validBasicDetails: false,
      wipImp: Object,
      configurationRoot: null,
      error: '',
      stepper: 1,
    };
  },
  components: {
    ConfigurationAggregate,
    ImpAttributesCard,
    ImpScopeCard,
    ImpUserAdd,
  },
  methods: {
    leaveCreator() {
      this.$router.push('/modules');
    },
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
      // TODO catch error
      this.basicPage.templates = [];
      axios
        .get(`imp?impType=${this.basicPage.impType}`)
        .then((imp) => {
          const temp = imp.data.implementations;
          temp.forEach((entry) => {
            this.basicPage.templates.push(entry);
          });
        })
        .catch((err) => {
          console.log(err);
        });
      axios.get(`imp/default?impType=${this.basicPage.impType}`).then((res) => {
        this.basicPage.templates.push(res.data.template);
        this.wipImp = res.data.template;
      });
    },
    submitBasicDetails() {
      if (this.$refs.basicDetails.validate()) {
        this.stepper = 2;
        this.buildUpAttributesPage();
      }
    },
    buildUpAttributesPage() {
      this.configurationRoot = this.wipImp.configurationRoot;
      this.wipImp.name = this.basicPage.name;
    },
    createModuleImp() {
      this.wipImp.configurationRoot = this.configurationRoot;
      axios
        .post('imp', this.wipImp)
        .then((res) => {
          this.finalizePage.createdImpId = res.data.impId;
          this.finalizePage.createSuccess = true;
        })
        .catch((err) => {
          this.error = err.response.data.message || err;
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
