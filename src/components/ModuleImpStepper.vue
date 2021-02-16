<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
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
                        :rules="nameRules"
                        label="Name"
                        v-model="name"
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
                        no-data-text="Not a valid implementation type"
                        label="Type"
                        hint="Choose the type"
                        :items="impTypes"
                        v-model="impType"
                        :rules="impTypeRules"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-autocomplete
                        no-data-text="Not a valid template"
                        label="Template"
                        clearable
                        hint="Choose a template"
                        :item-text="(item) => item.name"
                        :items="templates"
                        v-model="template"
                        return-object
                        :disabled="!impType"
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
              <v-alert type="error" v-if="error">{{ error }}</v-alert>
              <v-form ref="attributes" @submit.prevent="submitAttributes" v-model="validAttributes">
                <v-container>
                  <v-row justify="space-between">
                    <v-col
                      v-for="attribute in this.attributesFundamental"
                      v-bind:key="attribute.index"
                      cols="12"
                      md="5"
                    >
                      <v-text-field v-model="attribute[1]" :label="attribute[0]"> </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-divider class="ma-4"></v-divider>
                  </v-row>
                  <v-row v-for="attribute in this.attributesComplex" v-bind:key="attribute.index">
                    <v-subheader> {{ attribute[0] }}</v-subheader>
                    <v-col v-for="subAtt in attribute[1]" v-bind:key="subAtt.index">
                      <v-text-field v-model="subAtt[1]" :label="attribute[0]"> </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
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
              <v-container v-for="aggregate in this.configurationRoot" v-bind:key="aggregate.index">
                <title>Configuration for Module Implementation</title>
                <ConfigurationAggregate v-bind:rootAggregate="aggregate" />
              </v-container>
              <v-btn color="primary" @click="stepper = 4">
                Continue
              </v-btn>

              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-alert type="error" v-if="error">{{ error }}</v-alert>

              <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

              <v-btn color="primary" @click="stepper = 4">
                Continue
              </v-btn>

              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="5">
              <v-alert type="error" v-if="error">{{ error }}</v-alert>

              <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

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
import inputConfig from '../assets/modImpDataConfig.json';
import ConfigurationAggregate from './moduleImpCreate/ConfigurationAggregate.vue';

export default {
  name: 'ModuleImpStepper',
  data() {
    return {
      inputConfig: {},
      validBasicDetails: false,
      validAttributes: false,
      impType: '',
      impTypes: [],
      template: {},
      templates: [],
      impScope: {},
      configurationRoot: [],
      attributes: {},
      attributesFundamental: [],
      attributesComplex: [],
      error: '',
      stepper: 1,
      name: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length <= 20 || 'Name must be less than 10 characters',
      ],
      impTypeRules: [(v) => !!v || 'Type is required'],
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
          this.impTypes = message.data.types.map((type) => type.name);
        })
        .catch((err) => {
          this.error = `Issue fetching data from API: ${err.response.data.error}`;
        });
    },
    getTemplates() {
      axios.get(`imp?type=${this.impType}`).then((imp) => {
        this.templates = imp.data.implementations;
        // TODO save array of templates
        this.templateDescription = this.templates.map((template) => template.name);
      });
    },
    submitBasicDetails() {
      if (this.$refs.basicDetails.validate()) {
        this.stepper = 2;
        this.buildUpAttributes();
      }
    },
    submitAttributes() {
      console.log(this.configurationRoot);
      if (this.$refs.attributes.validate()) {
        this.stepper = 3;
      }
    },
    buildUpAttributes() {
      this.attributes = Object.entries(this.template);
      /* this.attributes.forEach((attribute) => {
        console.log(`${attribute[0]} - ${attribute[1]}`);
      }); */
      console.log(this.attributes);
      this.attributes.forEach((attribute) => {
        if (attribute[0] === 'configurationRoot') {
          this.configurationRoot.push(attribute[1]);
        }
        if (attribute[0] === 'scope') {
          this.impScope = attribute[1];
        }
      });
      this.attributes = this.attributes.filter(
        (attribute) => !inputConfig.attributesOmitted.includes(attribute[0]),
      );
      this.attributesFundamental = this.attributes.filter(
        (attribute) => !(typeof attribute[1] === 'object'),
      );
      this.attributesComplex = this.attributes.filter(
        (attribute) => typeof attribute[1] === 'object',
      );
      this.attributesComplex = this.attributesComplex.map((attribute) => {
        const attArray = [attribute[0], Object.entries(attribute[1])];
        return attArray;
      });
      console.log(this.configurationRoot);
    },
    printAttributes() {
      console.log(this.attributesComplex);
    },
  },
  computed: {
    configRoot() {
      return this.configurationRoot;
    },
  },
  watch: {
    impType: {
      handler(value) {
        if (value) {
          this.getTemplates();
        }
      },
    },
  },
  mounted() {
    this.getImplementationTypes();
  },
};
</script>
