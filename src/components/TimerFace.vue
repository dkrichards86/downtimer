<template>
  <v-card>
    <v-card-title class="headline">
      {{ duration.title }}
    </v-card-title>
    <v-divider />
    <div class="timer-face my-4 display-4">
      {{ formattedDuration }}
    </div>
    <v-progress-linear v-model="progress" height="16" />
    <v-divider />
    <slot></slot>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { timeFormat } from '../utils/helpers';


export default {
  name: 'TimerFace',
  data() {
    return {
      duration: {
        title: '',
        duration: 0,
      },
      progress: 0,
      countdown: 0,
    };
  },
  computed: {
    ...mapGetters([
      'getActiveTimer', 'getTimerById', 'getTimerValue',
    ]),
    formattedDuration() {
      return timeFormat(this.countdown);
    },
  },
  watch: {
    getActiveTimer(newTimerId) {
      this.changeTimer(this.getTimerById(newTimerId));
    },
    getTimerValue(newTime) {
      this.changeTimerValue(newTime);
    },
  },
  created() {
    const duration = this.getTimerById(this.getActiveTimer);
    const progress = (duration.duration - this.getTimerValue) / duration.duration;
    this.setDuration(duration);
    this.setProgress(progress);
    this.setCountdown(duration.duration);
  },
  methods: {
    changeTimer(duration) {
      this.setDuration(duration);
      this.setProgress(0);
    },
    changeTimerValue(time) {
      this.setCountdown(time);
      const progress = (this.duration.duration - time) / this.duration.duration;
      this.setProgress(progress);
    },
    setProgress(progress) {
      this.progress = progress * 100;
    },
    setDuration(duration) {
      this.duration = duration;
    },
    setCountdown(countdown) {
      this.countdown = countdown;
    },
  },
};
</script>

<style>
  .timer-face {
    font-family: 'Roboto Mono', monospace!important;
    text-align: center;
    color: #34495E;
  }
</style>
