<template>
  <v-row justify="center">
    <v-card width="90%" class="mx-2 pa-3">
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-text-field :label="textField.name"></v-text-field>
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
    };
  },
  methods: {},
  mounted() {},
};
</script>
