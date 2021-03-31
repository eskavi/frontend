<template>
  <v-row justify="center">
    <v-card width="92%" class="mx-2 pa-3">
      <v-avatar size="28" rounded
        ><v-btn class="error" @click="deleteThis"><v-icon> mdi-close</v-icon></v-btn></v-avatar
      >
      <v-row justify="center">
        <v-card-title class="ma-2">Select Field</v-card-title>
      </v-row>
      <v-row justify="center">
        <v-switch
          v-model="selectField.allowMultiple"
          label="Allow duplication of Select Field?"
        ></v-switch>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-text-field label="Name of Select Field" v-model="selectField.name"></v-text-field>
        </v-col>
      </v-row>
      <v-divider class="my-4" />
      <v-row justify="center">
        <v-col cols="12" md="11">
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
              ><v-btn class="ma-4" @click="addEntry">
                <v-icon left> mdi-plus </v-icon> Add</v-btn
              ></v-row
            >
          </div>
        </v-col>
      </v-row>
      <v-divider class="my-4" />
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Start of key expression"
            v-model="selectField.keyExpression.expressionStart"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="End of key expression"
            v-model="selectField.keyExpression.expressionEnd"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
export default {
  props: {
    selectField: Object,
    index: Number,
  },
  components: {},
  data() {
    return {
      selectArray: [],
    };
  },
  methods: {
    onBuildUp() {},
    deleteThis() {
      this.$emit('deleteThis', this.selectField);
    },
    addEntry() {
      this.selectArray.push(['', '']);
    },
    deleteEntry(entry) {
      this.selectArray = this.selectArray.filter((element) => element[0] !== entry[0]);
      this.updateProp();
    },
    updateProp() {
      this.selectField.content = Object.fromEntries(this.selectArray);
    },
  },
  mounted() {
    this.onBuildUp();
    this.selectArray = Object.entries(this.selectField.content);
  },
};
</script>
