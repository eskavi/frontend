<template>
  <v-card width="90%" height="95%" class="ma-4 pb-4" color="rgb(0,0,0,0.05)">
    <v-card-title>{{ this.rootAggregate.name }}</v-card-title>
    <v-row justify="center">
      <v-card width="90%" class="mx-7 mb-2" color="rgb(0,0,0,0.05)">
        <v-card-subtitle>Text fields for ModuleImp </v-card-subtitle>
        <TextConfiguration
          class="my-2"
          v-for="textField in this.displayChildren.textFieldChildren"
          :textField="textField"
          v-bind:key="textField.index"
        />
        <v-btn
          class="ml-2 mb-2"
          v-on:click="addElementToChildren(displayChildren.textFieldChildren, template.text)"
        >
          <v-icon> mdi-plus-box-outline </v-icon>
        </v-btn>
      </v-card>
    </v-row>
    <v-row justify="center">
      <v-card width="90%" height="95%" class="mx-7 my-2" color="rgb(0,0,0,0.05)">
        <v-card-subtitle>Select fields for ModuleImp </v-card-subtitle>
        <v-text-field
          v-for="selectField in this.displayChildren.selectChildren"
          label="Name of Select Field"
          v-model="selectField.name"
          v-bind:key="selectField.index"
          class="mx-4"
        ></v-text-field>
        <v-btn
          class="ma-2"
          @click="addElementToChildren(displayChildren.selectChildren, template.select)"
        >
          <v-icon> mdi-plus-box-outline </v-icon>
        </v-btn>
      </v-card>
    </v-row>
    <v-row justify="center">
      <v-card width="90%" height="95%" class="mx-7 my-2">
        <v-card-subtitle>File fields for ModuleImp </v-card-subtitle>
        <v-text-field
          v-for="fileField in this.displayChildren.fileChildren"
          label="Name of File Field"
          v-model="fileField.name"
          v-bind:key="fileField.index"
          class="mx-4"
        ></v-text-field>
        <v-btn
          class="ma-2"
          @click="addElementToChildren(displayChildren.fileChildren, template.file)"
        >
          <v-icon> mdi-plus-box-outline </v-icon>
        </v-btn>
      </v-card>
    </v-row>
    <v-row justify="center">
      <v-card width="90%" height="95%" class="mx-7 my-2">
        <v-card-subtitle>Switches for ModuleImp </v-card-subtitle>
        <v-text-field
          v-for="switchField in this.displayChildren.switchChildren"
          label="Name of Switch"
          v-model="switchField.name"
          v-bind:key="switchField.index"
          class="mx-4"
        ></v-text-field>
        <v-btn
          class="ma-2"
          @click="addElementToChildren(displayChildren.switchChildren, template.switch)"
        >
          <v-icon> mdi-plus-box-outline </v-icon>
        </v-btn>
      </v-card>
    </v-row>
    <v-row v-if="this.childAggregates && this.childAggregates.length" justify="center" height="95%">
      <ConfigurationAggregate
        v-for="aggregate in this.childAggregates"
        v-bind:key="aggregate.index"
        v-bind:rootAggregate="aggregate"
      ></ConfigurationAggregate>
    </v-row>
  </v-card>
</template>

<script>
import TextConfiguration from './TextConfiguration.vue';

export default {
  name: 'ConfigurationAggregate',
  props: {
    rootAggregate: Object,
  },
  components: {
    TextConfiguration,
  },
  data() {
    return {
      template: {
        text: {
          type: 'TextField',
          name: '',
          value: '',
        },
        select: {
          type: 'Select',
          name: '',
          value: '',
        },
        file: {
          type: 'FileField',
          fileName: '',
          value: '',
        },
        switch: {
          type: 'Switch',
          name: '',
          value: '',
        },
      },
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
    addElementToChildren(childrenArray, templateObject) {
      childrenArray.push(templateObject);
    },
  },
  computed: {},
  mounted() {
    console.log('Ping');
    this.setUpTree();
  },
};
</script>
