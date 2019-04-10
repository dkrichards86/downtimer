<template>
  <v-app>
    <v-toolbar dark app fixed clipped-left color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title class="dt-title">
        DownTimer.io
      </v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" app fixed clipped>
      <sidebar />
    </v-navigation-drawer>
    <v-content>
      <v-container>
        <v-layout>
          <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <reload-snackbar v-if="swupdate" />
    <rating-snackbar v-if="getTimerStatus === 2"/>
  </v-app>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
import WrapperSidebar from '../components/WrapperSidebar';
import SWReloadSnackbar from '../components/SWReloadSnackbar';
import TimerRatingSnackbar from '../components/TimerRatingSnackbar';
import { TIMER_STATUSES } from '../utils/timer';

export default {
  name: 'Wrapper',
  components: {
    sidebar: WrapperSidebar,
    'reload-snackbar': SWReloadSnackbar,
    'rating-snackbar': TimerRatingSnackbar
  },
  data() {
    return {
      minute: 0,
      drawer: null,
      swupdate: false,
      timer: null
    };
  },
  computed: {
    ...mapGetters([
      'getActiveTimer', 'getPlayChime', 'getChime', 'getTimerById',
      'getTimerStatus', 'getTimerValue'
    ]),
  },
  watch: {
    getActiveTimer(newTimer) {
      this.last_timer = Object.assign({}, this.timer);
      this.timer = this.getTimerById(newTimer);
    },
    getTimerStatus(status) {
      if (status === TIMER_STATUSES.EXPIRED) {
        document.title = 'DownTimer.io';

        this.$native_notification.notify("Time's Up!", {
          body: `Your timer '${this.timer.title}' has finished.`,
          timeout: 4000,
        });

        if (this.getPlayChime) {
          this.$alert_chime.play(this.getChime);
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
    this.hydrate();
    this.initTimer();
    this.timer = this.getTimerById(this.getActiveTimer);

    if (this.$native_notification.hasDefaultPermission()) {
      this.$native_notification.notify('DownTimer Notification', {
        body: 'This is where DownTimer notifications will appear.',
        timeout: 4000
      });
    }

    window.addEventListener('beforeunload', this.exitHandler);
    document.addEventListener('swUpdated', this.showRefreshUI);
  },
  destroyed() {
    document.removeEventListener('swUpdated', this.showRefreshUI);
    window.removeEventListener('beforeunload', this.exitHandler);
  },
  methods: {
    ...mapActions([
      'hydrate', 'initTimer', 'startTimer',
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
    },
    showRefreshUI() {
      this.swupdate = true;
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
