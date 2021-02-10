<template>
  <v-container>
    <v-row v-for="text in this.childFundamental" v-bind:key="text.index">
      <v-card-title> {{ 'Hello World' }}</v-card-title>
    </v-row>
    <v-row v-for="aggregate in this.childAggregates" v-bind:key="aggregate.index">
      <ConfigurationAggregate v-bind:rootAggregate="aggregate" />
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    rootAggregate: {},
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
  updated() {
    this.setUpTree();
    console.log(`Agg-Array ${this.childAggregates}`);
    console.log(`Fundamental array ${this.childFundamental}`);
  },
};
</script>
