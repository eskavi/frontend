<template>
  <v-row justify="center">
    <v-card width="90%" class="ma-4">
      <v-text-field label="Name of Text Field" v-model="textField.name" class="mx-4"></v-text-field>
      <v-btn @click="test"> Test </v-btn>
      <v-autocomplete
        class="mx-4"
        :items="this.dataTypes"
        label="Select DataType"
        v-model="textConfig.dataType"
      >
      </v-autocomplete>
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
      textConfig: {
        dataType: '',
        value: '',
        name: '',
        allowMultiple: '',
        type: '',
      },
      dataTypes: [],
    };
  },
  methods: {
    onBuildUp() {
      this.textConfig = this.textField;
      this.dataTypes = this.$store.getters.getDataTypes;
    },
    test() {
      console.log('Test');
      this.$store.dispatch('fetchDataTypes').then((res) => {
        console.log(res);
        this.dataTypes = res.data.data_types;
      });
      console.log(this.dataTypes);
    },
  },
};
</script>
