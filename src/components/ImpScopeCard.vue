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
            :items="this.accessPage.impScopes"
          >
          </v-autocomplete>
        </v-row>
      </v-form>
    </v-container>

    <v-btn color="primary" @click="stepper = 5">
      Continue
    </v-btn>

    <v-btn text>
      Cancel
    </v-btn>
  </v-container>
</template>
