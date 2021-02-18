<template>
  <v-row justify="center">
    <v-card width="90%" class="mx-2 pa-3">
      <v-avatar size="28" rounded v-if="this.textField.allowMultiple">
        <v-btn class="error" @click="$emit('deleteThis', textField)"
          ><v-icon> mdi-close</v-icon></v-btn
        >
      </v-avatar>
      <v-avatar size="28" rounded v-if="this.textField.allowMultiple" class="ml-1">
        <v-btn class="success" @click="$emit('addThis', textField)"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-avatar>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-text-field :label="textField.name" v-model="textField.value"></v-text-field>
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
