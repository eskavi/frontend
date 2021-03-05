<template>
  <v-dialog max-width="40%">
    <v-btn text color="primary"> Delete </v-btn>>
    <v-card>
      <v-card-title> Delete Implementation </v-card-title>
      <v-textarea>
        You are about to delete this Implementation permanently. Are you certain?</v-textarea
      >
      <v-btn class="error"> Yes, delete</v-btn>
      <v-btn> Cancel </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {};
</script>
