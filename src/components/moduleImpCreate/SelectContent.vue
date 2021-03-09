<template>
  <div>
    <v-row v-for="(key, value) in this.content" v-bind:key="key"> {{ key }} {{ value }} </v-row>
  </div>
</template>

<script>
export default {
  props: {
    // content: {},
  },
  data() {
    return {
      selectArray: [],
      content: {
        var1: 'hello',
        var2: 'world',
      },
    };
  },
  mounted() {
    this.selectArray = this.content;
  },
};
</script>
