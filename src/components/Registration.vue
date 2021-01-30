<template>
  <div class="registration">
    <v-card class="px-8">
      <v-card-title> Register </v-card-title>
      <v-card-text> Create a new user account.</v-card-text>
      <v-form>
        <v-text-field
          label="E-mail adress"
          name="Email"
          placeholder="Email adress"
        >
        </v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="showPWLogin ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPWLogin ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          @click:append="showPWLogin = !showPWLogin"
        >
        </v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="showPWLogin ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPWLogin ? 'text' : 'password'"
            name="input-10-1"
            label="Repeat password"
            @click:append="showPWLogin = !showPWLogin"
            >
        </v-text-field>
        <v-btn class="mb-4"> Register </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Authentication',

  data: () => ({}),
};
</script>
