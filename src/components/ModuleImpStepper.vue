<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-stepper v-model="e1" alt-labels>
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1" @click="e1 = 1">
              Basic Details
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2" @click="e1 = 2">
              Configuration
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3" :complete="e1 > 3" @click="e1 = 3">
              Access
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="4" :complete="e1 > 3">
              Done
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-alert type="error" v-if="error">{{ error }}</v-alert>
              <v-form>
                <v-container>
                  <v-row justify="space-between">
                    <v-col cols="12" md="5">
                      <v-text-field
                        :counter="20"
                        label="Name"
                        required
                        hint="Name your implementation"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-text-field
                        label="Author"
                        required
                        disabled
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
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-autocomplete
                        no-data-text="Not a valid template"
                        label="Template"
                        clearable
                        hint="Choose a template"
                        :items="templates"
                        :disabled="!impType"
                        v-model="template"
                      >
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>

              <v-btn color="primary" @click="e1 = 2">
                Continue
              </v-btn>

              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-alert type="error" v-if="error">{{ error }}</v-alert>

              <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

              <v-btn color="primary" @click="e1 = 3">
                Continue
              </v-btn>

              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-alert type="error" v-if="error">{{ error }}</v-alert>

              <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

              <v-btn color="primary" @click="e1 = 4">
                Continue
              </v-btn>

              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="4">
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

export default {
  name: 'ModuleImpStepper',
  data() {
    return {
      impType: '',
      impTypes: [],
      template: '',
      templates: [],
      error: '',
      e1: 1,
    };
  },
  methods: {
    getImplementationTypes() {
      axios
        .get('imp/types')
        .then((message) => {
          this.impTypes = message.data.types;
        })
        .catch((err) => {
          this.error = `Issue fetching data from API: ${err.response.data.error}`;
        });
    },
  },
  watch: {
    impType: {},
  },
  mounted() {
    this.getImplementationTypes();
  },
};
</script>
