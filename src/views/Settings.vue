<template>
  <v-card class="px-3 py-2">
    <v-card-title primary-title class="headline">
      Settings
    </v-card-title>
    <v-card-text>
      <v-switch
        v-model="autoplay"
        label="Automatically play next timer" />
      <v-switch
        v-model="cycle"
        :disabled="!getAutoplay"
        label="Repeat timer list" />
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
      ]
    };
  },
  computed: {
    ...mapGetters([
      'getAutoplay', 'getCycle', 'getTimers', 'getChime', 'getPlayChime'
    ]),
    autoplay: {
      get() {
        return this.getAutoplay;
      },
      set(value) {
        this.setAutoplay(value);
      },
    },
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
    cycle: {
      get() {
        return this.getCycle;
      },
      set(value) {
        this.setCycle(value);
      },
    },
  },
  methods: {
    ...mapActions([
      'setAutoplay', 'setCycle', 'setChime', 'setPlayChime'
    ]),
  },
};
</script>
