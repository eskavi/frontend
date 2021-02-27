<template>
  <div class="users">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <UserTable />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import UserTable from '../components/UserTable.vue';

export default {
  name: 'AdminDashboard',
  components: {
    UserTable,
  },
};
</script>
