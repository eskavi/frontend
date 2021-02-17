<template>
  <v-row justify="center">
    <v-card width="90%" class="mx-2 pa-3">
      <v-row justify="center">
        <v-card-title class="ma-2">Text Field nr {{ this.index }}</v-card-title>
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
    arrayPosition: Number,
  },
  data() {
    return {
      dataTypes: [],
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
  },
  mounted() {
    this.onBuildUp();
  },
};
</script>
