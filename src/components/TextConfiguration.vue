<template>
  <v-card>
    <v-text-field label="Name of Text Field" v-model="textField.name" class="mx-4"></v-text-field>
    <v-autocomplete :items="dataTypes" label="Select DataType" v-model="textConfig.dataType">
    </v-autocomplete>
  </v-card>
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
      this.dataTypes = this.$store.getters.getSnackbarMsg;
    },
  },
};
</script>
