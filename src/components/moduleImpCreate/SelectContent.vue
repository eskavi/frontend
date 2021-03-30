<template>
  <div>
    <v-row v-for="element in this.selectArray" :key="element.index" @change="updateProp">
      <v-text-field required label="Displayed Key" v-model="element[0]"></v-text-field>
      <v-text-field required label="Value inserted" v-model="element[1]"></v-text-field>
      <v-avatar class="ma-3" size="28" rounded>
        <v-btn class="" small @click="deleteEntry(element)"
          ><v-icon> mdi-close</v-icon></v-btn
        ></v-avatar
      >
    </v-row>
    <v-row justify="center"
      ><v-btn class="ma-4" @click="addEntry"> <v-icon left> mdi-plus </v-icon> Add</v-btn></v-row
    >
  </div>
</template>

<script>
export default {
  props: {
    content: {},
  },
  data() {
    return {
      testObject: {
        eins: 'Me',
        zwei: 'MeToo',
      },
      selectArray: [],
    };
  },
  methods: {
    addEntry() {
      this.selectArray.push(['', '']);
    },
    deleteEntry(entry) {
      console.log('Ping');
      this.selectArray = this.selectArray.filter((element) => element[0] !== entry[0]);
      this.updateProp();
    },
    updateProp() {
      this.content = Object.fromEntries(this.selectArray);
    },
  },
  mounted() {
    this.selectArray = Object.entries(this.content);
  },
  watch: {
    /**
    selectArray: {
      handler() {
        this.content = Object.fromEntries(this.selectArray);
      },
    }, */
  },
};
</script>
