<template>
  <v-row justify="center">
    <v-card width="92%" class="mx-2 pa-3">
      <v-avatar size="28" rounded
        ><v-btn class="error" @click="deleteThis"><v-icon> mdi-close</v-icon></v-btn></v-avatar
      >
      <v-row justify="center">
        <v-card-title class="ma-2">Switch</v-card-title>
      </v-row>
      <v-row justify="center">
        <v-switch
          v-model="switchField.allowMultiple"
          label="Allow duplication of Switch?"
        ></v-switch>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-text-field label="Name of Switch" v-model="switchField.name"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Start of key expression"
            v-model="switchField.keyExpression.expresssionStart"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="End of key expression"
            v-model="switchField.keyExpression.expresssionEnd"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
export default {
  props: {
    switchField: Object,
    index: Number,
  },
  data() {
    return {};
  },
  methods: {
    onBuildUp() {},
    deleteThis() {
      this.$emit('deleteThis', this.switchField);
    },
  },
  mounted() {
    this.onBuildUp();
  },
};
</script>
