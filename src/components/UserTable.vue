<template>
  <v-card class="pa-5">
    <v-card-title>
      Users
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      sort-by="email"
      :loading="loading"
    >
      <template v-slot:top>
        <v-dialog v-model="dialogEdit" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit User</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.email"
                      label="ID"
                      readonly
                      hint="Cannot edit ID"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="editedItem.userLevel"
                      label="User Level"
                      :items="userLevels"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="closeEdit">
                Cancel
              </v-btn>
              <v-btn color="primary" text @click="saveEdit">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">
              Delete this account?
            </v-card-title>
            <v-card-text
              >By deleting this user account all personal data will be gone forever, including any
              module implementations the user might have created and/or shared in the
              past.</v-card-text
            >
            <v-alert type="error" class="mx-2 my-2" v-if="error">{{ error }}</v-alert>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="closeDelete">Cancel</v-btn>
              <v-btn color="error" text @click="deleteItemConfirm">Delete</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)" :disabled="disableEdit">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserTable',
  data() {
    return {
      dialogEdit: false,
      error: '',
      disableEdit: false,
      loading: true,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        email: '',
        userLevel: '',
      },
      defaultItem: {
        email: '',
        userLevel: '',
      },
      search: '',
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'email',
        },
        { text: 'UserLevel', value: 'userLevel' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      users: [],
      userLevels: ['user', 'register'],
    };
  },
  methods: {
    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
      // TODO make axios delete call
      this.closeDelete();
      this.$store.dispatch('sendActionResponse', 'User deleted');
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = { ...item };
      this.dialogEdit = true;
    },
    saveEdit() {
      this.users[this.editedIndex].email = this.editedItem.email;
      this.users[this.editedIndex].userLevel = this.editedItem.userLevel;

      // TODO make axios update call
      this.closeEdit();
      this.$store.dispatch('sendActionResponse', 'User updated');
    },
    closeEdit() {
      this.dialogEdit = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    initialize() {
      // TODO make axios call to fetch user data here
      setTimeout(() => {
        this.users = [
          { email: 'nivadam@eskavi.de', userLevel: 'BASIC_USER' },
          { email: 'manuel@eskavi.com', userLevel: 'ADMINISTRATOR' },
        ];
        this.loading = false;
      }, 2000);

      axios
        .get('/user/levels')
        .then((response) => {
          this.userLevels = response.data;
        })
        .catch(() => {
          this.$store.dispatch('sendActionResponse', "Could'nt load user levels. Edit disabled.");
          this.disableEdit = true;
        });
    },
  },
  created() {
    this.initialize();
  },
};
</script>
