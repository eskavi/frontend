<template>
  <v-row justify="center">
    <v-card width="92%" class="mx-2 pa-3">
      <v-avatar size="28" rounded
        ><v-btn class="error" @click="deleteThis"><v-icon> mdi-close</v-icon></v-btn></v-avatar
      >
      <v-row justify="center">
        <v-card-title class="ma-2">Text Field</v-card-title>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-text-field label="Name of Text Field" v-model="textField.name"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-autocomplete
            :items="this.dataTypes"
            label="Select DataType"
            v-model="textField.dataType"
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Start of key expression"
            v-model="textField.keyExpression.expresssionStart"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="End of key expression"
            v-model="textField.keyExpression.expresssionEnd"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
export default {
  props: {
    textField: Object,
  },
  data() {
    return {
      dataTypes: [],
      echo: 'echo',
    };
  },
  methods: {
    onBuildUp() {
      this.getDataTypes();
    },
    getDataTypes() {
      this.$store.dispatch('fetchDataTypes').then((res) => {
        this.dataTypes = res.data.data_types;
      });
    },
    deleteThis() {
      this.$emit('deleteThis', this.textField);
    },
  },
  mounted() {
    this.onBuildUp();
  },
};
</script>
