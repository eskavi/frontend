<template>
  <v-container>
    <v-list-item class="ma-4" background-color="">
      <v-row v-for="dataConfig in this.childFundamental" v-bind:key="dataConfig.index">
        <v-card-title> {{ dataConfig.type }}</v-card-title>
        <p>{{ dataConfig.keyExpression }}</p>
      </v-row>
    </v-list-item>
    <v-row v-if="this.childAggregates && this.childAggregates.length">
      <ConfigurationAggregate
        v-for="aggregate in this.childAggregates"
        v-bind:key="aggregate.index"
        v-bind:rootAggregate="aggregate"
      ></ConfigurationAggregate>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ConfigurationAggregate',
  props: {
    rootAggregate: Object,
  },
  data() {
    return {
      childAggregates: [],
      childFundamental: [],
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
          default:
            this.childFundamental.push(entry);
        }
      });
    },
  },
  mounted() {
    console.log('Ping');
    this.setUpTree();
  },
};
</script>
