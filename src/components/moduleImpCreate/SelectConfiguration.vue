<template>
  <v-row justify="center">
    <v-card width="90%" class="mx-2 pa-3">
      <v-avatar size="28" rounded
        ><v-btn class="error" @click="deleteThis"><v-icon> mdi-close</v-icon></v-btn></v-avatar
      >
      <v-row justify="center">
        <v-card-title class="ma-2">Select Field</v-card-title>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-text-field label="Name of Select Field" v-model="selectField.name"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-combobox
            v-model="selectField.content"
            label="Enter all selection possibilities here"
            deletable-chips
            multiple
            chips
          >
          </v-combobox>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Start of key expression"
            v-model="selectField.keyExpression.expresssionStart"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="End of key expression"
            v-model="selectField.keyExpression.expresssionEnd"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
export default {
  props: {
    selectField: Object,
    index: Number,
  },
  data() {
    return {};
  },
  methods: {
    onBuildUp() {},
    deleteThis() {
      this.$emit('deleteThis', this.selectField);
    },
  },
  mounted() {
    this.onBuildUp();
  },
};
</script>
