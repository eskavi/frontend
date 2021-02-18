<template>
  <v-card width="92%" height="95%" class="ma-4 pa-3" color="rgb(0,0,0,0.05)">
    <v-avatar size="28" rounded v-if="!this.isInit"
      ><v-btn class="error" @click="deleteThis"><v-icon> mdi-close</v-icon></v-btn></v-avatar
    >
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-text-field
          v-model="rootAggregate.name"
          solo
          class="mt-2"
          label="Aggregate Name"
          background-color="white"
          hint="Aggregate Name"
          rounded
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="!this.isInit">
      <v-switch
        v-model="rootAggregate.allowMultiple"
        label="Allow duplication of Aggregate?"
      ></v-switch>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-text-field
          label="Start of key expression"
          v-model="rootAggregate.keyExpression.expresssionStart"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="End of key expression"
          v-model="rootAggregate.keyExpression.expresssionEnd"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row
      v-for="child in this.rootAggregate.children"
      v-bind:key="child.index"
      justify="center"
      class=""
    >
      <ConfigurationAggregate
        class="my-2"
        @deleteThis="deleteFromChildren"
        v-if="child.jsonTypeInfo == 'CONFIGURATION_AGGREGATE'"
        v-bind:key="child.index"
        v-bind:isInit="false"
        v-bind:rootAggregate="child"
      ></ConfigurationAggregate>
      <TextConfiguration
        class="my-2"
        @deleteThis="deleteFromChildren"
        v-if="child.jsonTypeInfo == 'TEXT_FIELD'"
        :textField="child"
        v-bind:key="child.index"
      />
      <SelectConfiguration
        class="my-2"
        @deleteThis="deleteFromChildren"
        v-if="child.jsonTypeInfo == 'SELECT'"
        :selectField="child"
        v-bind:key="child.index"
      />
      <SwitchConfiguration
        class="my-2"
        @deleteThis="deleteFromChildren"
        v-if="child.jsonTypeInfo == 'SWITCH'"
        :switchField="child"
        v-bind:key="child.index"
      />
      <FileConfiguration
        class="my-2"
        @deleteThis="deleteFromChildren"
        v-if="child.jsonTypeInfo == 'FILE_FIELD'"
        :fileField="child"
        v-bind:key="child.index"
      />
      <ImpSelectConfiguration
        class="my-2"
        @deleteThis="deleteFromChildren"
        v-if="child.jsonTypeInfo == 'IMPLEMENTATION_SELECT'"
        :impSelectField="child"
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
import axios from 'axios';
import TextConfiguration from './TextConfiguration.vue';
import FileConfiguration from './FileConfiguration.vue';
import SelectConfiguration from './SelectConfiguration.vue';
import SwitchConfiguration from './SwitchConfiguration.vue';
import ImpSelectConfiguration from './ImpSelectConfiguration.vue';

export default {
  name: 'ConfigurationAggregate',
  props: {
    rootAggregate: Object,
    isInit: Boolean,
  },
  components: {
    TextConfiguration,
    FileConfiguration,
    SelectConfiguration,
    SwitchConfiguration,
    ImpSelectConfiguration,
  },
  data() {
    return {
      addTemplate: null,
      // TODO replace with api call, once backend is live
      templates: [
        /*
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
        {
          jsonTypeInfo: 'IMPLEMENTATION_SELECT',
          keyExpression: {
            expressionStart: '',
            expressionEnd: '',
          },
          generics: [],
          type: 'SERIALIZER',
          name: '',
          allowMultiple: false,
        },
      */
      ],
    };
  },
  methods: {
    addToChildren() {
      const clone = JSON.parse(JSON.stringify(this.addTemplate));
      this.rootAggregate.children.push(clone);
      this.addTemplate = null;
    },
    deleteThis() {
      this.$emit('deleteThis', this.rootAggregate);
    },
    deleteFromChildren(childObject) {
      this.rootAggregate.children = this.rootAggregate.children.filter(
        (curChild) => curChild !== childObject,
      );
    },
  },
  computed: {},
  mounted() {
    axios.get('imp/configTemplates').then((res) => {
      this.templates = res.data.templates;
    });
  },
};
</script>
