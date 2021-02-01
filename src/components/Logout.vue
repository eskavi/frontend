<template>
  <v-btn @click="logout">Logout</v-btn>
</template>

<script>
export default {
  name: 'Logout',

  data: () => ({}),
  methods: {
    logout() {
      // logout user
      this.$store.state.snackbarMsg = 'You have been logged out.';
      this.$router.push({ path: '/' });
    },
  },
};
</script>
