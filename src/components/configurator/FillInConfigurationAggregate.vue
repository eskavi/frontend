<template>
  <v-card width="90%" height="95%" class="ma-4 pb-4" color="rgb(0,0,0,0.05)">
    <v-avatar size="28" rounded v-if="this.rootAggregate.allowMultiple" class="mt-3 ml-3">
      <v-btn class="error" @click="$emit('deleteThis', rootAggregate)"
        ><v-icon> mdi-close</v-icon></v-btn
      >
    </v-avatar>
    <v-avatar size="28" rounded v-if="this.rootAggregate.allowMultiple" class="mt-3 ml-1">
      <v-btn class="success" @click="$emit('addThis', rootAggregate)"
        ><v-icon>mdi-plus</v-icon></v-btn
      >
    </v-avatar>
    <v-row justify="center">
      <v-card-title>
        {{ this.rootAggregate.name }}
      </v-card-title>
    </v-row>
    <v-row v-for="child in this.rootAggregate.children" v-bind:key="child.index" justify="center">
      <FillInConfigurationAggregate
        v-if="child.jsonTypeInfo == 'CONFIGURATION_AGGREGATE'"
        v-bind:key="child.index"
        @addThis="addToChildren"
        @deleteThis="deleteFromChildren"
        v-bind:rootAggregate="child"
      />
      <FillInTextConfiguration
        v-if="child.jsonTypeInfo == 'TEXT_FIELD'"
        class="ma-1"
        :textField="child"
        @addThis="addToChildren"
        @deleteThis="deleteFromChildren"
        v-bind:key="child.index"
      />
      <FillInSelectConfiguration
        v-if="child.jsonTypeInfo == 'SELECT'"
        class="ma-1"
        :selectField="child"
        @addThis="addToChildren"
        @deleteThis="deleteFromChildren"
        v-bind:key="child.index"
      />
      <FillInFileConfiguration
        v-if="child.jsonTypeInfo == 'FILE_FIELD'"
        class="ma-1"
        :fileField="child"
        @addThis="addToChildren"
        @deleteThis="deleteFromChildren"
        v-bind:key="child.index"
      />
      <FillInSwitchConfiguration
        v-if="child.jsonTypeInfo == 'SWITCH'"
        class="ma-1"
        :switchField="child"
        @addThis="addToChildren"
        @deleteThis="deleteFromChildren"
        v-bind:key="child.index"
      />
      <FillInImplementationSelectConfiguration
        v-if="child.jsonTypeInfo == 'IMPLEMENTATION_SELECT'"
        class="ma-1"
        :implementationSelectField="child"
        @addThis="addToChildren"
        @deleteThis="deleteFromChildren"
        v-bind:key="child.index"
      />
    </v-row>
  </v-card>
</template>

<script>
import FillInTextConfiguration from './FillInTextConfiguration.vue';
import FillInFileConfiguration from './FillInFileConfiguration.vue';
import FillInSwitchConfiguration from './FillInSwitchConfiguration.vue';
import FillInSelectConfiguration from './FillInSelectConfiguration.vue';
import FillInImplementationSelectConfiguration from './FillInImplementationSelectConfiguration.vue';

export default {
  name: 'FillInConfigurationAggregate',
  props: {
    rootAggregate: Object,
  },
  components: {
    FillInTextConfiguration,
    FillInFileConfiguration,
    FillInSelectConfiguration,
    FillInSwitchConfiguration,
    FillInImplementationSelectConfiguration,
  },
  data() {
    return {};
  },
  methods: {
    addToChildren(o) {
      this.rootAggregate.children.push(JSON.parse(JSON.stringify(o)));
      this.$store.dispatch('sendActionResponse', `Added ${o.name}`);
    },
    deleteFromChildren(o) {
      if (this.rootAggregate.children.filter((compare) => compare.name === o.name).length > 1) {
        this.rootAggregate.children = this.rootAggregate.children.filter(
          (curChild) => curChild !== o,
        );
        this.$store.dispatch('sendActionResponse', `Deleted ${o.name}`);
      } else {
        this.$store.dispatch('sendActionResponse', 'You must keep one module of this type');
      }
    },
  },
  computed: {},
  mounted() {},
};
</script>
