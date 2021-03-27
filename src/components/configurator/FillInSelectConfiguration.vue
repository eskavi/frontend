<template>
  <v-row justify="center">
    <v-card width="90%" class="mx-2 pa-3">
      <v-avatar size="28" rounded v-if="this.selectField.allowMultiple">
        <v-btn class="error" @click="$emit('deleteThis', selectField)"
          ><v-icon> mdi-close</v-icon></v-btn
        >
      </v-avatar>
      <v-avatar size="28" rounded v-if="this.selectField.allowMultiple" class="ml-1">
        <v-btn class="success" @click="$emit('addThis', selectField)"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-avatar>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-autocomplete
            :label="selectField.name"
            v-model="selectField.value"
            :items="Object.entries(selectField.content)"
            :item-text="(item) => item.key"
            :item-value="(item) => item.value"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: 'FillInSelectConfiguration',
  props: {
    selectField: Object,
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
