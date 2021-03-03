<template>
  <v-container>
    <v-alert type="error" v-if="error">{{ error }}</v-alert>
    <v-form
      ref="attributes"
      v-if="this.wipImp"
      @submit.prevent="submitAttributes"
      v-model="validAttributes"
    >
      <v-row justify="space-between">
        <v-col cols="12" md="5">
          <v-text-field
            required
            v-if="wipImp.hasOwnProperty('name')"
            v-model="wipImp.name"
            label="Name of the Module Implementation"
            disabled
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            v-if="wipImp.hasOwnProperty('author')"
            v-model="wipImp.author"
            label="Name of the Module Developer"
            disabled
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-divider class="ma-4"></v-divider>
      <v-row>
        <v-col cols="12" md="5">
          <v-autocomplete
            v-if="wipImp.hasOwnProperty('messageType')"
            v-model="wipImp.messageType"
            label="Pick the corresponding Message Type"
            no-data-text="No valid template"
            clearable
            :item-text="(item) => item.name"
            :items="this.pageInfo.messageTypes"
            return-object
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="5">
          <v-autocomplete
            v-if="wipImp.hasOwnProperty('protocolType')"
            v-model="wipImp.protocolType"
            label="Pick the corresponding Protocol Type"
            no-data-text="No valid template"
            clearable
            :item-text="(item) => item.name"
            :items="this.pageInfo.protocolTypes"
            return-object
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-form>
    <v-btn color="primary" @click="stepForward">
      Continue
    </v-btn>
    <v-btn text>
      Cancel
    </v-btn>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ImpAttributesCard',
  props: {
    wipImp: Object,
  },
  data() {
    return {
      pageInfo: {
        protocolTypes: [],
        messageTypes: [],
      },
      error: '',
      validAttributes: false,
    };
  },
  methods: {
    getMessageTypes() {
      axios.get(`imp?impType=MESSAGE_TYPE`).then((res) => {
        this.pageInfo.messageTypes = res.data.implementations;
      });
    },
    getProtocolTypes() {
      axios.get(`imp?impType=PROTOCOL_TYPE`).then((imp) => {
        this.pageInfo.protocolTypes = imp.data.implementations;
      });
    },
    stepForward() {
      this.$emit('stepperForward');
    },
  },
  mounted() {
    this.getProtocolTypes();
    this.getMessageTypes();
  },
};
</script>
