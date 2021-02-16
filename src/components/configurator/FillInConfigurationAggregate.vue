<template>
  <v-card width="90%" height="95%" class="ma-4 pb-4" color="rgb(0,0,0,0.05)">
    <v-row justify="center">
      <v-card-title>
        {{ this.rootAggregate.name }}
        <v-btn text icon v-if="this.rootAggregate.allowMultiple">
          <v-icon> mdi-plus </v-icon>
        </v-btn>
      </v-card-title>
    </v-row>
    <v-row v-for="child in this.rootAggregate.children" v-bind:key="child.index" justify="center">
      <TextConfiguration
        v-if="child.jsonTypeInfo == 'TEXT_FIELD'"
        class="ma-1"
        :textField="child"
        v-bind:key="child.index"
      />
      <ConfigurationAggregate
        v-if="child.jsonTypeInfo == 'CONFIGURATION_AGGREGATE'"
        v-bind:key="child.index"
        v-bind:rootAggregate="child"
      ></ConfigurationAggregate>
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
    return {};
  },
  methods: {},
  computed: {},
  mounted() {},
};
</script>
