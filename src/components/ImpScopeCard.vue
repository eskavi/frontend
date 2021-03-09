<template>
  <v-container>
    <v-alert type="error" v-if="error">{{ error }}</v-alert>
    <v-container>
      <v-form ref="access" @submit.prevent="submitAccess">
        <v-row v-if="wipImp.scope">
          <v-autocomplete
            v-if="wipImp.scope"
            v-model="wipImp.scope.impScope"
            label="Select the publication scope of your Implementation"
            :items="this.impScopes"
          >
          </v-autocomplete>
        </v-row>
      </v-form>
    </v-container>

    <v-btn color="primary" @click="checkValid">
      Continue
    </v-btn>

    <v-btn text @click="$emit('cancelMod')">
      Cancel
    </v-btn>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ImpScopeCard',
  props: {
    wipImp: Object,
  },
  data() {
    return {
      impScopes: [],
      error: '',
    };
  },
  methods: {
    checkValid() {
      console.log(this.wipImp.scope);
      if (this.wipImp.scope.impScope === 'PUBLIC') {
        console.log(this.userLevel);
        if (!(this.userLevel === 'PUBLISHING_USER' || this.userLevel === 'ADMINISTRATOR')) {
          this.error = 'You do not have sufficient permission to publish a module implementation.';
        } else {
          this.error = '';
          this.$emit('stepperForward');
        }
      } else {
        this.$emit('stepperForward');
      }
    },
    getImpScopes() {
      axios.get('imp/scopes').then((imp) => {
        this.impScopes = imp.data.impScopes;
      });
    },
  },
  computed: {
    userLevel() {
      return this.$store.state.user.userLevel;
    },
  },
  mounted() {
    this.getImpScopes();
  },
};
</script>
