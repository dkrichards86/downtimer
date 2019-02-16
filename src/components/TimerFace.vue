<template>
  <div>
    <div class="timer-face my-4 display-4">
      {{ formattedDuration(countdown) }}
    </div>
    <v-progress-linear v-model="progress" height="16" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { timeFormat } from '../utils/helpers';


export default {
  name: 'TimerFace',
  props: {
    duration: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      progress: 0,
      countdown: 0
    };
  },
  computed: {
    ...mapGetters([
      'getTimerValue'
    ]),
    formattedDuration() {
      return countdown => timeFormat(countdown);
    },
  },
  watch: {
    getTimerValue(newTime) {
      this.countdown = newTime;
      const progress = (this.duration - newTime) / this.duration;
      this.progress = progress * 100;
    }
  },
  created() {
    this.countdown = this.duration;
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
