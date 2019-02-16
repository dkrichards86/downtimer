<template>
  <v-card>
    <v-card-title primary-title class="headline">
      {{ duration.title }}
    </v-card-title>
    <v-divider />
    <timer-face :duration="duration.duration" />
    <v-divider />
    <timer-controls />
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import TimerFace from '../components/TimerFace';
import TimerControls from '../components/TimerControls';

export default {
  name: 'Timer',
  components: {
    'timer-face': TimerFace,
    'timer-controls': TimerControls,
  },
  data() {
    return {
      duration: {
        title: '',
        duration: 0
      },
      progress: 0
    };
  },
  computed: {
    ...mapGetters([
      'getActiveTimer', 'getTimerById', 'getTimers', 'getTimerStatus', 'getTimerValue'
    ])
  },
  watch: {
    getActiveTimer(newTimerId) {
      const duration = this.getTimerById(newTimerId);
      this.duration = duration;
      this.progress = 0;
    },
    getTimerValue(ms) {
      const progress = (this.duration.duration - ms) / this.duration.duration;
      this.progress = progress * 100;
    }
  },
  created() {
    const duration = this.getTimerById(this.getActiveTimer);
    const progress = (duration.duration - this.getTimerValue) / duration.duration;
    this.duration = duration;
    this.progress = progress * 100;
  }
};
</script>

<style>
  .timer-face {
    font-family: 'Roboto Mono', monospace!important;
    text-align: center;
    color: #34495E;
  }
</style>
