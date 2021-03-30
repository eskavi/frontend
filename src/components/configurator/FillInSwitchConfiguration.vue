<template>
  <v-row justify="center">
    <v-card width="90%" class="mx-2 pa-3">
      <v-avatar size="28" rounded v-if="this.switchField.allowMultiple">
        <v-btn class="error" @click="$emit('deleteThis', switchField)"
          ><v-icon> mdi-close</v-icon></v-btn
        >
      </v-avatar>
      <v-avatar size="28" rounded v-if="this.switchField.allowMultiple" class="ml-1">
        <v-btn class="success" @click="$emit('addThis', switchField)"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-avatar>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-switch
            :label="switchField.name"
            v-model="switchField.value"
            :false-value="switchField.content.falseValue"
            :true-value="switchField.content.trueValue"
          ></v-switch>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: 'FillInSwitchConfiguration',
  props: {
    switchField: Object,
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
