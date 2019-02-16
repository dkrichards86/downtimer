<template>
  <v-app>
    <sidebar :drawer="drawer" />
    <v-toolbar dark app fixed clipped-left color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title class="dt-title">
        DownTimer.io
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-layout>
          <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
import Push from 'push.js';
import WrapperSidebar from '../components/WrapperSidebar';
import { TIMER_STATUSES } from '../utils/timer';

export default {
  name: 'Wrapper',
  components: {
    sidebar: WrapperSidebar
  },
  data() {
    return {
      minute: 0,
      drawer: null,
      snackbar: false,
      timer: null
    };
  },
  computed: {
    ...mapGetters([
      'getActiveTimer', 'getPlayChime', 'getChime', 'getTimerById', 'getTimers',
      'getTimerStatus', 'getAutoplay', 'getPlaySource', 'getTimerValue'
    ]),
  },
  watch: {
    getActiveTimer(newTimer) {
      this.timer = this.getTimerById(newTimer);
    },
    getTimerStatus(status) {
      if (status === TIMER_STATUSES.EXPIRED) {
        document.title = 'DownTimer.io';

        Push.create("Time's Up!", {
          body: `Timer '${this.timer.title}' has expired.`,
          timeout: 4000,
        });

        if (this.getPlayChime) {
          this.$alert_chime.play(this.getChime);
        }

        if (this.getAutoplay && this.getPlaySource === 'increment') {
          this.startTimer();
        } else {
          this.setTimerStatus(TIMER_STATUSES.STOPPED);
        }
      } else if (status === TIMER_STATUSES.PAUSED) {
        document.title = 'DownTimer.io - Paused';
      }
    },
    getTimerValue(ms) {
      this.setTitle(ms);
    }
  },
  created() {
    this.hydrateTimers();
    this.hydrateSettings();
    this.initTimer();
    this.timer = this.getTimerById(this.getActiveTimer);

    window.addEventListener('beforeunload', this.exitHandler);
  },
  destroyed() {
    window.removeEventListener('beforeunload', this.exitHandler);
  },
  methods: {
    ...mapActions([
      'hydrateTimers', 'hydrateSettings', 'initTimer', 'startTimer',
      'setTimerStatus', 'logEvent'
    ]),
    setTitle(ms) {
      const mmt = moment(ms * 1000);
      const minute = mmt.minute();

      if (minute !== this.minute) {
        document.title = `DownTimer.io - ${this.timer.title} (${minute}min)`;
        this.minute = minute;
      }
    },
    exitHandler() {
      this.logEvent('exit');
    }
  },
};
</script>

<style>
  .dt-title {
    font-size: 2rem;
    font-family: 'Damion', cursive;
  }
</style>
