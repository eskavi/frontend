<template>
  <v-card width="90%" height="95%" class="ma-4 pb-4" color="rgb(0,0,0,0.05)">
    <v-row justify="center">
      <v-card-title>{{ this.rootAggregate.name }}</v-card-title>
      <v-btn class="ma-4"> <v-icon> mdi-plus </v-icon></v-btn>
    </v-row>
    <v-row justify="center">
      <v-row v-for="child in this.rootAggregate.children" v-bind:key="child.index">
        <v-col v-if="child.jsonTypeInfo == 'CONFIGURATION_AGGREGATE'">
          <ConfigurationAggregate
            width="90%"
            v-bind:key="child.index"
            v-bind:rootAggregate="child"
          ></ConfigurationAggregate>
        </v-col>
        <v-col v-if="child.jsonTypeInfo == 'TextField'">
          <TextConfiguration class="ma-1" :textField="child" v-bind:key="child.index" />
        </v-col>
      </v-row>
    </v-row>
  </v-card>
</template>

<script>
import TextConfiguration from './FillInTextConfiguration.vue';

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
      // TODO replace with api call, once backend is live
      template: {
        text: {
          jsonTypeInfo: 'TextField',
          keyExpression: {
            expressionStart: '',
            expressionEnd: '',
          },
          dataType: 'TEXT',
          name: '',
          allowMultiple: false,
        },
        select: {
          jsonTypeInfo: 'Select',
          keyExpression: {
            expressionStart: '',
            expressionEnd: '',
          },
          content: {},
          name: '',
          allowMultiple: false,
        },
        file: {
          jsonTypeInfo: 'FileField',
          keyExpression: {
            expressionStart: '',
            expressionEnd: '',
          },
          name: '',
          allowMultiple: false,
        },
        switch: {
          jsonTypeInfo: 'Switch',
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
      },
    };
  },
  methods: {},
  computed: {},
  mounted() {},
};
</script>
