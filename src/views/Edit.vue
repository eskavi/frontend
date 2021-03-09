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
              Attributes
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="stepperIndex > 2"
              step="2"
              @click="stepperIndex = stepperIndex > 2 ? 2 : stepperIndex"
            >
              Configuration
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="stepperIndex > 3"
              step="3"
              @click="stepperIndex = stepperIndex > 3 ? 3 : stepperIndex"
            >
              Access
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <ImpAttributesCard
                @cancelMod="leaveImpEditor"
                @stepperForward="stepperIndex++"
                v-bind:wipImp="wipImp"
                v-if="this.loaded"
              >
              </ImpAttributesCard>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-row class="ma-2">
                <v-btn color="primary" @click="stepperIndex++">
                  Continue
                </v-btn>
                <v-btn text @click="stepperIndex--" class="mx-2">
                  Cancel
                </v-btn>
              </v-row>
              <v-row justify="center">
                <ConfigurationAggregate
                  @stepperForward="stepperIndex++"
                  v-bind:rootAggregate="wipImp.configurationRoot"
                  v-bind:isInit="true"
                  v-if="this.loaded"
                />
              </v-row>
              <v-row class="ma-2">
                <v-btn color="primary" @click="stepperIndex++">
                  Continue
                </v-btn>
                <v-btn text @click="stepperIndex--" class="mx-2">
                  Cancel
                </v-btn>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="3" v-if="this.loaded">
              <v-row justify="center">
                <ImpScopeCard
                  :disabled="accessDone"
                  @stepperForward="accessDone = true"
                  @cancelMod="stepperIndex--"
                  v-bind:wipImp="wipImp"
                />
              </v-row>
              <v-divider class="ma-4"></v-divider>
              <v-row justify="center">
                <ImpUserAdd v-bind:impId="this.moduleId" />
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
      <v-col md="12" cols="10">
        <v-card>
          <v-row align="center" justify="space-around">
            <v-spacer />
            <v-btn class="error ma-4" @click="leaveImpEditor"> Cancel Edit </v-btn>
            <v-spacer />
            <v-btn color="primary ma-4" @click="updateImp"> Submit changes </v-btn>
            <v-spacer />
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import ImpUserAdd from '../components/ImpUserAdd.vue';
import ImpAttributesCard from '../components/ImpAttributesCard.vue';
import ImpScopeCard from '../components/ImpScopeCard.vue';
import ConfigurationAggregate from '../components/moduleImpCreate/ConfigurationAggregate.vue';
// import ImpScopeCard from '../components/ImpScopeCard.vue';

export default {
  name: 'Edit',
  props: {},
  components: {
    ImpUserAdd,
    ImpAttributesCard,
    ConfigurationAggregate,
    ImpScopeCard,
  },
  data() {
    return {
      error: '',
      loaded: false,
      moduleId: Number,
      wipImp: {},
      stepperIndex: 1,
      accessDone: false,
    };
  },
  methods: {
    leaveImpEditor() {
      this.$router.push('/modules');
    },
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
          this.$store.dispatch('sendActionResponse', 'Implementation was updated successfully!');
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
