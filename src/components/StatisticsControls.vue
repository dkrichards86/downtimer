<template>
  <v-layout row wrap align-center class="px-2">
    <v-flex>
      <v-checkbox
        v-model="stops"
        label="Show Interruptions" />
    </v-flex>
    <v-flex>
      <v-select
        v-model="timeWindow"
        :items="windows"
        label="Time Windows"/>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'StatisticsControls',
  data() {
    return {
      windows: [
        { value: 7, text: 'Past Week' },
        { value: 14, text: 'Past 2 Weeks' },
        { value: 28, text: 'Past 4 Weeks' }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'getStatsInterruptions', 'getStatsWindow'
    ]),
    stops: {
      get() {
        return this.getStatsInterruptions;
      },
      set(value) {
        this.setStatsInterruptions(value);
      }
    },
    timeWindow: {
      get() {
        return this.getStatsWindow;
      },
      set(value) {
        this.setStatsWindow(value);
      }
    },
  },
  methods: {
    ...mapActions([
      'setStatsInterruptions', 'setStatsWindow'
    ]),
  },
};
</script>
