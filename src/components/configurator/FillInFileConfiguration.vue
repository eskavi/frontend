<template>
  <v-row justify="center">
    <v-card width="90%" class="mx-2 pa-3">
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-file-input truncate-length="15" :label="fileField.name"></v-file-input>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: 'FillInFileConfiguration',
  props: {
    fileField: Object,
  },
  data() {
    return {};
  },
  methods: {
    onBuildUp() {},
  },
  mounted() {
    this.onBuildUp();
  },
};
</script>
