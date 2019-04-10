<template>
  <v-card class="px-3 py-2">
    <v-card-title primary-title class="headline">
      Settings
    </v-card-title>
    <v-card-text>
      <v-select
        v-model="timeWindow"
        :items="windows"
        label="Time Windows"/>
      <v-switch
        v-model="playchime"
        label="Play a chime on completion" />
      <v-select
        v-model="chime"
        :items="chimeObj"
        :disabled="!getPlayChime"
        label="Chime"
        item-text="chime"
        item-value="abbr" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Settings',
  data: function () {
    return {
      chimeObj: [
        { title: 'Arpeggio', chime: 'arpeggio' },
        { title: 'Coins', chime: 'coins' },
        { title: 'Definite', chime: 'definite' },
        { title: 'Not bad', chime: 'notbad' }
      ],
      windows: [
        { value: 7, text: 'Past Week' },
        { value: 14, text: 'Past 2 Weeks' },
        { value: 28, text: 'Past 4 Weeks' }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'getChime', 'getPlayChime', 'getStatsWindow'
    ]),
    playchime: {
      get() {
        return this.getPlayChime;
      },
      set(value) {
        this.setPlayChime(value);
      }
    },
    chime: {
      get() {
        return this.getChime;
      },
      set(value) {
        this.$alert_chime.play(value);
        this.setChime(value);
      }
    },
    timeWindow: {
      get() {
        return this.getStatsWindow;
      },
      set(value) {
        this.setStatsWindow(value);
      }
    }
  },
  methods: {
    ...mapActions([
      'setChime', 'setPlayChime', 'setStatsWindow'
    ]),
  },
};
</script>
