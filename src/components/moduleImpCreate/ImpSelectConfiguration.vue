<template>
  <v-row justify="center">
    <v-card width="92%" class="mx-2 pa-3">
      <v-avatar size="28" rounded
        ><v-btn class="error" @click="deleteThis"><v-icon> mdi-close</v-icon></v-btn></v-avatar
      >
      <v-row justify="center">
        <v-card-title class="ma-2">Implementation Field</v-card-title>
      </v-row>
      <v-row justify="center">
        <v-switch
          v-model="impSelectField.allowMultiple"
          label="Allow duplication of Implementation Field?"
        ></v-switch>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-text-field
            label="Name of Implementation Select Field"
            v-model="impSelectField.name"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-autocomplete
            v-model="impSelectField.type"
            label="Define the type of the Implementation."
            :items="impTypes"
            chips
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Start of key expression"
            v-model="impSelectField.keyExpression.expresssionStart"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="End of key expression"
            v-model="impSelectField.keyExpression.expresssionEnd"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-autocomplete
            v-model="impSelectField.content"
            label="Define all necessary generic types."
            :item-text="(item) => item.name"
            :items="generics"
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
    impSelectField: Object,
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
      this.$emit('deleteThis', this.impSelectField);
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
        axios.get(`imp?type=${generic}`).then((res) => {
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
