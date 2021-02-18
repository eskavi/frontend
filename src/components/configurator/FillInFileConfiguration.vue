<template>
  <v-row justify="center">
    <v-card width="90%" class="mx-2 pa-3">
      <v-avatar size="28" rounded v-if="this.fileField.allowMultiple">
        <v-btn class="error" @click="$emit('deleteThis', fileField)"
          ><v-icon> mdi-close</v-icon></v-btn
        >
      </v-avatar>
      <v-avatar size="28" rounded v-if="this.fileField.allowMultiple" class="ml-1">
        <v-btn class="success" @click="$emit('addThis', fileField)"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-avatar>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-file-input
            truncate-length="15"
            :label="fileField.name"
            @change="update"
          ></v-file-input>
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
    update(e) {
      // update filename in configuration object
      if (e) {
        this.fileField.value = e.name;
      } else {
        this.fileField.value = '';
      }
    },
  },
  mounted() {
    this.onBuildUp();
  },
};
</script>
