<template>
  <v-row justify="center">
    <v-card width="90%" class="ma-4">
      <v-text-field :label="textField.name" class="mx-4"></v-text-field>
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
    };
  },
  methods: {
    onBuildUp() {
      this.textConfig = this.textField;
      this.dataTypes = this.$store.getters.getDataTypes;
    },
  },
};
</script>
