<template>
  <v-container>
    <v-row justify="center">
      <v-col md="12" cols="10">
        <v-card>
          <v-alert v-if="this.alertMessage" :type="this.alertType">
            <v-row
              >{{ alertMessage }}
              <v-spacer />
              <v-btn small @click="$router.push('/modules')"> Home </v-btn>
            </v-row></v-alert
          >
        </v-card>
      </v-col>

      <v-col md="12" cols="10">
        <v-skeleton-loader max-height="100" type="card" v-if="!loaded" />
        <v-card v-if="loaded">
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
        <v-skeleton-loader max-height="150" type="card" v-if="!loaded" />
        <v-stepper alt-labels non-linear v-model="stepperIndex" v-if="loaded">
          <v-stepper-header>
            <v-stepper-step editable step="1" @click="moveStepper(1)">
              Attributes
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step editable step="2" @click="moveStepper(2)">
              Configuration
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step editable step="3" @click="moveStepper(3)">
              Access
            </v-stepper-step>

            <v-divider></v-divider>
            <v-stepper-step editable step="4" @click="moveStepper(4)">
              User Access
            </v-stepper-step>
          </v-stepper-header>

          <v-skeleton-loader max-height="300" type="card" v-if="!loaded" />
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
              <v-row class="ma-2" v-if="loaded">
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
                  @change="updateImpScope"
                  @stepperForward="stepperIndex++"
                  @cancelMod="stepperIndex--"
                  v-bind:wipImp="wipImp"
                />
              </v-row>
              <v-divider class="ma-4"></v-divider>
            </v-stepper-content>
            <v-stepper-content step="4" v-if="this.loaded">
              <v-row justify="center">
                <v-alert v-if="!(this.wipImp.scope.impScope === 'SHARED')">
                  Users can only be added to SHARED implementations.
                </v-alert>
                <ImpUserAdd
                  ref="userAdd"
                  v-if="this.wipImp.scope.impScope === 'SHARED'"
                  v-bind:impId="this.moduleId"
                  :addUserTrigger="this.addUserTrigger"
                  :isEmbedded="true"
                />
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
      <v-col md="12" cols="10">
        <v-card>
          <v-skeleton-loader max-height="75" type="card" v-if="!loaded" />

          <v-row align="center" justify="space-around" v-if="loaded">
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
      addUserTrigger: 0,
      wipImp: {},
      stepperIndex: 1,
      accessDone: false,
      alertType: '',
      alertMessage: '',
    };
  },
  methods: {
    updateImpScope() {},
    moveStepper(nextStep) {
      this.stepperIndex = nextStep;
    },
    leaveImpEditor() {
      this.$router.push('/modules');
    },
    setWipImp() {
      axios
        .get('/imp', { params: { id: this.moduleId } })
        .then((res) => {
          this.wipImp = res.data.implementations[0];
          this.loaded = true;
          console.log(this.wipImp);
        })
        .catch(() => {
          this.$store.dispatch(
            'sendActionResponse',
            'Error, tried to edit invalid Implementation.',
          );
          this.$router.push('/modules');
        });
    },
    updateImp() {
      this.alertMessage = '';
      axios
        .put('/imp', this.wipImp)
        .then(() => {
          axios
            .post('/imp/impScope', { impScope: this.wipImp.scope.impScope, impId: this.moduleId })
            .then(() => {
              if (this.wipImp.scope.impScope === 'SHARED') {
                this.addUserTrigger += 1;
              }
              this.alertType = 'success';
              this.alertMessage = 'Changes were submitted successfully!';
            })
            .catch((err) => {
              this.alertType = 'error';
              this.alertMessage = `An error occurred while updating imp scope: \n ${err.data.error}`;
            });

          this.$store.dispatch('sendActionResponse', 'Implementation was updated successfully!');
        })
        .catch((err) => {
          this.alertType = 'error';
          this.alertMessage = `An error occurred while posting changes to module imp: \n ${err.data.error}`;
        });
    },
  },
  mounted() {
    this.moduleId = this.$route.query.impId;
    this.setWipImp();
  },
};
</script>
