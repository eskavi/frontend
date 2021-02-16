<template>
  <v-row justify="center">
    <v-card width="90%" class="mx-2 py-2">
      <v-text-field label="Name of Text Field" v-model="textField.name" class="mx-4"></v-text-field>
      <v-autocomplete
        class="mx-4"
        :items="this.dataTypes"
        label="Select DataType"
        v-model="textField.dataType"
      >
      </v-autocomplete>
      <v-text-field
        label="Start of key expression"
        v-model="textField.keyExpression.expresssionStart"
        class="mx-4"
      ></v-text-field>
      <v-text-field
        label="End of key expression"
        v-model="textField.keyExpression.expresssionEnd"
        class="mx-4"
      ></v-text-field>
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
