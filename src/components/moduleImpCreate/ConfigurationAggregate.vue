<template>
  <v-card width="90%" height="95%" class="ma-4 pb-4" color="rgb(0,0,0,0.05)">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-text-field
          v-model="this.rootAggregate.name"
          solo
          class="mt-6"
          label="Aggregate Name"
          background-color="white"
          hint="Aggregate Name"
          rounded
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row v-for="child in this.rootAggregate.children" v-bind:key="child.index" justify="center">
      <ConfigurationAggregate
        v-if="child.jsonTypeInfo == 'CONFIGURATION_AGGREGATE'"
        v-bind:key="child.index"
        v-bind:rootAggregate="child"
      ></ConfigurationAggregate>
      <TextConfiguration
        v-if="child.jsonTypeInfo == 'TEXT_FIELD'"
        class="ma-1"
        :textField="child"
        v-bind:key="child.index"
      />
      <SelectConfiguration
        v-if="child.jsonTypeInfo == 'SELECT'"
        class="ma-1"
        :selectField="child"
        v-bind:key="child.index"
      />
      <SwitchConfiguration
        v-if="child.jsonTypeInfo == 'SWITCH'"
        class="ma-1"
        :switchField="child"
        v-bind:key="child.index"
      />
      <FileConfiguration
        v-if="child.jsonTypeInfo == 'FILE_FIELD'"
        class="ma-1"
        :fileField="child"
        v-bind:key="child.index"
      />
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-autocomplete
          no-data-text="Not a valid template"
          label="Select template type to add..."
          clearable
          hint="Choose a Configuration type"
          :item-text="(item) => item.jsonTypeInfo"
          :items="templates"
          v-model="addTemplate"
          return-object
          class="mx-4"
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn :disabled="this.addTemplate == null" class="ma-4" @click="addToChildren">
          <v-icon left> mdi-plus </v-icon> Add</v-btn
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import TextConfiguration from './TextConfiguration.vue';
import FileConfiguration from './FileConfiguration.vue';
import SelectConfiguration from './SelectConfiguration.vue';
import SwitchConfiguration from './SwitchConfiguration.vue';

export default {
  name: 'ConfigurationAggregate',
  props: {
    rootAggregate: Object,
  },
  components: {
    TextConfiguration,
    FileConfiguration,
    SelectConfiguration,
    SwitchConfiguration,
  },
  data() {
    return {
      addTemplate: null,
      // TODO replace with api call, once backend is live
      templates: [
        {
          jsonTypeInfo: 'CONFIGURATION_AGGREGATE',
          keyExpression: {
            expressionStart: '',
            expressionEnd: '',
          },
          enforceCompatibility: false,
          name: '',
          allowMultiple: false,
          children: [],
        },
        {
          jsonTypeInfo: 'TEXT_FIELD',
          keyExpression: {
            expressionStart: '',
            expressionEnd: '',
          },
          dataType: 'TEXT',
          name: '',
          allowMultiple: false,
        },
        {
          jsonTypeInfo: 'SELECT',
          keyExpression: {
            expressionStart: '',
            expressionEnd: '',
          },
          content: [],
          name: '',
          allowMultiple: false,
        },
        {
          jsonTypeInfo: 'FILE_FIELD',
          keyExpression: {
            expressionStart: '',
            expressionEnd: '',
          },
          name: '',
          allowMultiple: false,
        },
        {
          jsonTypeInfo: 'SWITCH',
          keyExpression: {
            expressionStart: '',
            expressionEnd: '',
          },
          value: '',
          content: {
            falseValue: '',
            trueValue: '',
          },
          name: '',
          allowMultiple: false,
        },
      ],
    };
  },
  methods: {
    addToChildren() {
      this.rootAggregate.children.push(this.addTemplate);
      this.addTemplate = null;
      console.log(this.rootAggregate);
    },
  },
  computed: {},
  mounted() {},
};
</script>
