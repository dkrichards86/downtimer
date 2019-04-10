<template>
  <v-card-actions>
    <v-spacer />
    <v-btn
      v-if="getTimerStatus == -1 || getTimerStatus == 2 || getTimerStatus == 3"
      color="primary"
      flat
      @click="startTimer">
      <v-icon left>play_circle_outline</v-icon>
      <span>Start</span>
    </v-btn>
    <v-btn
      v-else-if="getTimerStatus == 0"
      color="primary"
      flat
      @click="resumeTimer">
      <v-icon left>play_circle_outline</v-icon>
      <span>Resume</span>
    </v-btn>
    <v-btn
      v-else-if="getTimerStatus == 1"
      flat
      color="primary"
      @click="pauseTimer">
      <v-icon left>pause_circle_outline</v-icon>
      <span>Pause</span>
    </v-btn>
    <v-btn
      flat
      color="primary"
      @click="resetTimer">
      <v-icon left>replay</v-icon>
      <span>Reset</span>
    </v-btn>
  </v-card-actions>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TimerControls',
  computed: {
    ...mapGetters([
      'getTimerStatus'
    ])
  },
  methods: {
    ...mapActions([
      'startTimer', 'pauseTimer', 'resetTimer', 'resumeTimer'
    ])
  }
};
</script>
