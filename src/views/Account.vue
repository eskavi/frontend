<template>
  <div class="account">
    <AccountSettings />
  </div>
</template>

<script>
// @ is an alias to /src
import AccountSettings from '../components/AccountSettings.vue';

export default {
  name: 'Home',
  components: {
    AccountSettings,
  },
};
</script>
