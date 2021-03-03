<template>
  <v-container
    ><v-row justify="center">
      <v-col md="12" cols="10">
        <v-stepper v-model="stepperIndex" alt-labels>
          <v-stepper-header>
            <v-stepper-step
              :complete="stepperIndex > 1"
              step="1"
              @click="stepperIndex = stepperIndex > 1 ? 1 : stepperIndex"
            >
              Implementation attributes
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="stepperIndex > 2"
              step="2"
              @click="stepperIndex = stepperIndex > 2 ? 2 : stepperIndex"
            >
              Attributes
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="stepperIndex > 3"
              step="3"
              @click="stepperIndex = stepperIndex > 3 ? 3 : stepperIndex"
            >
              Configuration
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              step="4"
              :complete="stepperIndex > 4"
              @click="stepperIndex = stepperIndex > 4 ? 4 : stepperIndex"
            >
              Access
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="5" :complete="stepperIndex > 4">
              Done
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1"></v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Edit',
  props: {
    impId: String,
  },
  data() {
    return {
      moduleId: Number,
      wipImp: Object,
      stepperIndex: 1,
    };
  },
  mounted() {
    console.log(this.id);
    this.moduleId = this.$route.params.impId;
    console.log(this.moduleId);
  },
};
</script>
