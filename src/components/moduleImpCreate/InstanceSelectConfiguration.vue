<template>
  <v-row justify="center">
    <v-card width="92%" class="mx-2 pa-3">
      <v-avatar size="28" rounded
        ><v-btn class="error" @click="deleteThis"><v-icon> mdi-close</v-icon></v-btn></v-avatar
      >
      <v-row justify="center">
        <v-card-title class="ma-2">Instance Field</v-card-title>
      </v-row>
      <v-row justify="center">
        <v-switch
          v-model="instanceSelectField.allowMultiple"
          label="Allow duplication of Instance Field?"
        ></v-switch>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-text-field
            label="Name of Instance Select Field"
            v-model="instanceSelectField.name"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-autocomplete
            v-model="instanceSelectField.type"
            label="Define the type of the Instance."
            :items="impTypes"
            chips
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Start of key expression"
            v-model="instanceSelectField.keyExpression.expressionStart"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="End of key expression"
            v-model="instanceSelectField.keyExpression.expressionEnd"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-autocomplete
            v-model="instanceSelectField.generics"
            label="Define all necessary generic types."
            :item-text="(item) => item.name"
            :items="generics"
            return-object
            deletable-chips
            multiple
            chips
          >
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
import axios from 'axios';
import inputConfig from '../../assets/modImpDataConfig.json';

export default {
  props: {
    instanceSelectField: Object,
  },
  data() {
    return {
      generics: [],
      impTypes: [],
    };
  },
  methods: {
    onBuildUp() {
      this.setUpGenerics();
      this.setUpImpTypes();
    },
    deleteThis() {
      this.$emit('deleteThis', this.instanceSelectField);
    },
    setUpImpTypes() {
      axios
        .get('imp/types')
        .then((message) => {
          this.impTypes = message.data.types.map((type) => type.name);
        })
        .catch((err) => {
          this.error = `Issue fetching data from API: ${err.response.data.error}`;
        });
    },
    setUpGenerics() {
      const genericImps = [];
      inputConfig.genericTypes.forEach((generic) => {
        axios.get(`imp?impType=${generic}`).then((res) => {
          res.data.implementations.forEach((element) => {
            genericImps.push(element);
          });
        });
        this.generics = genericImps;
      });
    },
  },
  mounted() {
    this.onBuildUp();
  },
};
</script>
