<template>
  <v-card class="mx-4" color="rgb(0,0,0,0.05)">
    <v-card-title>{{ this.rootAggregate.name }}</v-card-title>
    <v-row>
      <v-card width="90%" class="mx-7 mb-2">
        <v-card-subtitle>Text fields for ModuleImp </v-card-subtitle>
        <v-text-field
          v-for="textField in this.displayChildren.textFieldChildren"
          title="Name of
        Field"
          v-model="textField.name"
          v-bind:key="textField.index"
          class="mx-4"
        ></v-text-field>
        <v-btn class="ml-2 mb-2"> <v-icon> mdi-plus-box-outline </v-icon> </v-btn>
      </v-card>
    </v-row>
    <v-row>
      <v-card width="90%" class="mx-7 my-2">
        <v-card-subtitle>Select fields for ModuleImp </v-card-subtitle>
        <v-text-field
          v-for="selectField in this.displayChildren.selectChildren"
          title="Name of
        Field"
          v-model="selectField.name"
          v-bind:key="selectField.index"
          class="mx-4"
        ></v-text-field>
        <v-btn class="ma-2"> <v-icon> mdi-plus-box-outline </v-icon> </v-btn>
      </v-card>
    </v-row>
    <v-row>
      <v-card width="90%" class="mx-7 my-2">
        <v-card-subtitle>File fields for ModuleImp </v-card-subtitle>
        <v-text-field
          v-for="fileField in this.displayChildren.fileChildren"
          title="Name of Field"
          v-model="fileField.name"
          v-bind:key="fileField.index"
          class="mx-4"
        ></v-text-field>
        <v-btn class="ma-2"> <v-icon> mdi-plus-box-outline </v-icon> </v-btn>
      </v-card>
    </v-row>
    <v-row>
      <v-card width="90%" class="mx-7 my-2">
        <v-card-subtitle>Switches for ModuleImp </v-card-subtitle>
        <v-text-field
          v-for="switchField in this.displayChildren.switchChildren"
          title="Name of Switch"
          v-model="switchField.name"
          v-bind:key="switchField.index"
          class="mx-4"
        ></v-text-field>
        <v-btn class="ma-2"> <v-icon> mdi-plus-box-outline </v-icon> </v-btn>
      </v-card>
    </v-row>
    <v-row v-if="this.childAggregates && this.childAggregates.length">
      <ConfigurationAggregate
        v-for="aggregate in this.childAggregates"
        v-bind:key="aggregate.index"
        v-bind:rootAggregate="aggregate"
      ></ConfigurationAggregate>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'ConfigurationAggregate',
  props: {
    rootAggregate: Object,
    level: Number,
  },
  data() {
    return {
      childAggregates: [],
      displayChildren: {
        selectChildren: [],
        textFieldChildren: [],
        fileChildren: [],
        switchChildren: [],
      },
      childImpSelect: [],
    };
  },
  methods: {
    setUpTree() {
      this.rootAggregate.children.forEach((entry) => {
        switch (entry.type) {
          case 'ConfigurationAggregate':
            this.childAggregates.push(entry);
            break;
          case 'ImplementationSelect':
            this.childImpSelect.push(entry);
            break;
          case 'Select':
            this.displayChildren.selectChildren.push(entry);
            break;
          case 'TextField':
            this.displayChildren.textFieldChildren.push(entry);
            break;
          case 'FileField':
            this.displayChildren.fileChildren.push(entry);
            break;
          case 'Switch':
            this.displayChildren.switchChildren.push(entry);
            break;
          default:
            console.log(`Error, unknown category: ${entry}.`);
        }
      });
    },
  },
  computed: {},
  mounted() {
    console.log('Ping');
    this.setUpTree();
  },
};
</script>
