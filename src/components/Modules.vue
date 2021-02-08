<template>
  <div>
    <v-container v-if="$store.getters.isAuthenticated">
      <v-row>
        <v-spacer></v-spacer>
        <v-switch label="Only show my modules" v-model="onlyShowMine"></v-switch>
      </v-row>
    </v-container>
    <v-container>
      <v-row class="align-end" v-for="module in parseModules" :key="module.type">
        <v-col cols="12">
          <span>Modules</span>
          <h2>{{ module.type }}</h2>
          <v-divider></v-divider>
        </v-col>
        <v-col v-for="entry in module.entries" :key="entry.name" cols="3">
          <v-card>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline">{{ module.type }}</div>
                <v-list-item-title class="headline mb-1">{{ entry.name }}</v-list-item-title>
              </v-list-item-content>

              <!-- ICON -->
              <v-list-item-avatar>
                <v-tooltip bottom nudge-bottom="-10">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" v-if="entry.scope == 'public'">
                      mdi-earth
                    </v-icon>
                    <v-icon v-bind="attrs" v-on="on" v-else-if="entry.scope == 'shared'">
                      mdi-account-supervisor-circle
                    </v-icon>
                    <v-icon v-bind="attrs" v-on="on" v-else>
                      mdi-earth-off
                    </v-icon>
                  </template>
                  <span v-if="entry.scope == 'public'">Public</span>
                  <span v-else-if="entry.scope == 'shared'">Shared</span>
                  <span v-else>Private</span>
                </v-tooltip>
              </v-list-item-avatar>
            </v-list-item>
            <v-card-actions>
              <v-btn text color="primary">Edit</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="!parseModules" justify="center">No modules found.</v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Modules',

  data: () => ({
    modules: [],
    onlyShowMine: false,
  }),
  methods: {
    getModules() {
      this.modules = [];
      axios
        .get('imp')
        .then((response) => {
          response.data.implementations.forEach((imp) => {
            const pushData = {
              name: imp.name,
              scope: imp.impScope.scope,
              id: imp.implementationId,
              author: imp.author,
            };
            if (this.modules.find((entry) => entry.type === imp.impType)) {
              this.modules.find((entry) => entry.type === imp.impType).entries.push(pushData);
            } else {
              this.modules.push({
                type: imp.impType,
                entries: [pushData],
              });
            }
          });
        })
        .catch(() => {
          this.$store.dispatch('sendActionResponse', 'Error loading modules.');
        });
    },
  },
  computed: {
    parseModules() {
      if (this.onlyShowMine) {
        return this.modules.forEach((type) => {
          const res = type.entries.filter((imp) => imp.author === this.$store.state.user.email);
          return res;
        });
      }
      return this.modules;
    },
  },
  mounted() {
    this.getModules();
  },
};
</script>
