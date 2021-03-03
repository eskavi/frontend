<template>
  <v-container>
    <v-row justify="center">
      <v-col md="12" cols="10">
        <v-card>
          <v-row justify="center">
            <v-card-title
              >Editing Module Implementation: {{ this.wipImp.name }} ({{
                this.wipImp.jsonTypeInfo
              }})</v-card-title
            >
          </v-row>
        </v-card>
      </v-col>
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
            <v-stepper-content step="1">
              <ImpAttributesCard
                @stepperForward="stepperIndex++"
                v-bind:wipImp="wipImp"
                v-if="this.loaded"
              >
              </ImpAttributesCard>
            </v-stepper-content>
            <v-stepper-content step="2">
              <ConfigurationAggregate
                @stepperForward="stepperIndex++"
                v-bind:rootAggregate="wipImp.configurationRoot"
                v-bind:isInit="true"
                v-if="this.loaded"
              />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
      <v-col md="12" cols="10">
        <v-card>
          <v-row align="center" justify="space-around">
            <v-col md="9" cols="3">
              <v-btn class="error"> Cancel Edit </v-btn>
            </v-col>
            <v-col md="9" cols="3">
              <v-btn color="primary" @click="updateImp"> Submit changes </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import ImpAttributesCard from '../components/ImpAttributesCard.vue';
import ConfigurationAggregate from '../components/moduleImpCreate/ConfigurationAggregate.vue';
// import ImpScopeCard from '../components/ImpScopeCard.vue';

export default {
  name: 'Edit',
  props: {},
  components: {
    ImpAttributesCard,
    ConfigurationAggregate,
    // ImpScopeCard,
  },
  data() {
    return {
      error: '',
      loaded: false,
      moduleId: Number,
      wipImp: {},
      stepperIndex: 1,
    };
  },
  methods: {
    setWipImp() {
      axios.get('/imp', { params: { id: this.moduleId } }).then((res) => {
        this.wipImp = res.data.implementations[0];
        this.loaded = true;
        console.log(this.wipImp);
      });
    },
    updateImp() {
      axios
        .put('/imp', this.wipImp)
        .then(() => {
          console.log('Updated!');
          this.$router.push('modules');
        })
        .catch((err) => {
          this.error = err.data.error;
        });
    },
  },
  mounted() {
    this.moduleId = this.$route.query.impId;
    this.setWipImp();
  },
};
</script>
