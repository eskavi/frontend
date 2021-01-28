<template>
  <div>
    <v-container>
      <v-row>
        <v-spacer></v-spacer>
        <v-switch label="Only show my modules"></v-switch>
      </v-row>
    </v-container>
    <v-container>
      <v-row class="align-end" v-for="module in modules" :key="module.type">
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
              <v-list-item-avatar>
                <v-tooltip bottom nudge-bottom="-10">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on">
                      mdi-earth
                    </v-icon>
                  </template>

                  <span>Public</span>
                </v-tooltip>
              </v-list-item-avatar>
            </v-list-item>
            <v-card-actions>
              <v-btn text color="primary">Edit</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Modules',

  data: () => ({
    modules: [
      {
        type: 'Persistence Manager',
        entries: [
          { name: 'PostGRES' },
          { name: 'MySQL' },
          { name: 'PostGRES' },
          { name: 'MySQL' },
          { name: 'PostGRES' },
          { name: 'MySQL' },
        ],
      },
      { type: 'Handler', entries: [{ name: 'ICP' }, { name: 'RC2' }] },
      { type: 'Endpoints', entries: [{ name: 'Rest API' }, { name: 'Whatever' }] },
    ],
  }),
};
</script>
