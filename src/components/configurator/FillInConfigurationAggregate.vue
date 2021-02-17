<template>
  <v-card width="90%" height="95%" class="ma-4 pb-4" color="rgb(0,0,0,0.05)">
    <v-row justify="center">
      <v-card-title>
        {{ this.rootAggregate.name }}
      </v-card-title>
    </v-row>
    <v-row v-for="child in this.rootAggregate.children" v-bind:key="child.index" justify="center">
      <FillInConfigurationAggregate
        v-if="child.jsonTypeInfo == 'CONFIGURATION_AGGREGATE'"
        v-bind:key="child.index"
        v-bind:rootAggregate="child"
      />
      <FillInTextConfiguration
        v-if="child.jsonTypeInfo == 'TEXT_FIELD'"
        class="ma-1"
        :textField="child"
        v-bind:key="child.index"
      />
      <FillInSelectConfiguration
        v-if="child.jsonTypeInfo == 'SELECT'"
        class="ma-1"
        :selectField="child"
        v-bind:key="child.index"
      />
      <FillInFileConfiguration
        v-if="child.jsonTypeInfo == 'FILE_FIELD'"
        class="ma-1"
        :fileField="child"
        v-bind:key="child.index"
      />
      <FillInSwitchConfiguration
        v-if="child.jsonTypeInfo == 'SWITCH'"
        class="ma-1"
        :switchField="child"
        v-bind:key="child.index"
      />
      <FillInImplementationSelectConfiguration
        v-if="child.jsonTypeInfo == 'IMPLEMENTATION_SELECT'"
        class="ma-1"
        :implementationSelectField="child"
        v-bind:key="child.index"
      />
    </v-row>
    <v-row justify="center">
      <v-btn
        v-if="this.rootAggregate.allowMultiple"
        class="ma-2"
        @click="addToChildren(rootAggregate)"
      >
        <v-icon left>mdi-plus</v-icon>Add {{ this.rootAggregate.name }}
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
import FillInTextConfiguration from './FillInTextConfiguration.vue';
import FillInFileConfiguration from './FillInFileConfiguration.vue';
import FillInSwitchConfiguration from './FillInSwitchConfiguration.vue';
import FillInSelectConfiguration from './FillInSelectConfiguration.vue';
import FillInImplementationSelectConfiguration from './FillInImplementationSelectConfiguration.vue';

export default {
  name: 'FillInConfigurationAggregate',
  props: {
    rootAggregate: Object,
  },
  components: {
    FillInTextConfiguration,
    FillInFileConfiguration,
    FillInSelectConfiguration,
    FillInSwitchConfiguration,
    FillInImplementationSelectConfiguration,
  },
  data() {
    return {};
  },
  methods: {
    addToChildren(o) {
      console.log(o);
      this.rootAggregate.children.push({
        jsonTypeInfo: 'TEXT_FIELD',
        keyExpression: {
          expressionStart: '<dummy>',
          expressionEnd: '<dummy>',
        },
        value: 'dummy',
        dataType: 'TEXT',
        name: 'dummy',
        allowMultiple: false,
      });
    },
  },
  computed: {},
  mounted() {},
};
</script>
