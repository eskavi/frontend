<template>
  <v-dialog max-width="300" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" text color="primary"
        :disabled= isDisabled>
        Delete
      </v-btn>
    </template>
    <v-card>
      <v-card-title> Delete Implementation </v-card-title>
      <v-card-text>
        You are about to delete this Implementation permanently. Are you certain?</v-card-text
      >
      <v-card-actions>
        <v-btn @click="deleteImp" class="error"> Yes, delete</v-btn>
        <v-btn @click="dialog = false"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isDisabled: Boolean
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    deleteImp() {
      this.dialog = false;
      this.$emit('deleteImp');
    },
  },
};
</script>
