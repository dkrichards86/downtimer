<template>
  <v-list-tile @click="activateTimer">
    <v-list-tile-action />
    <v-list-tile-title>
      {{ timer.title }} ({{ formattedDuration(timer.duration) }})
    </v-list-tile-title>
    <v-list-tile-action>
      <v-icon small color="primary" @click.stop="editItem">
        edit
      </v-icon>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
import { timeFormat } from '../utils/helpers';

export default {
  name: 'WrapperSidebarTimerListItem',
  props: {
    timer: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      title: this.timer.title,
      time: '',
      minutes: 0,
      seconds: 0,
      dialog: false,
    };
  },
  computed: {
    ...mapGetters([
      'getActiveTimer',
    ]),
    formattedDuration() {
      return countdown => timeFormat(countdown);
    },
    isActive() {
      return this.getActiveTimer === this.timer.uid;
    }
  },
  watch: {
    timer(t) {
      this.getMinSec(t.duration);
      this.title = t.title;
    },
  },
  created() {
    this.getMinSec(this.timer.duration);
  },
  methods: {
    ...mapActions([
      'setActiveTimer', 'resetTimer'
    ]),
    activateTimer() {
      if (this.$router.currentRoute.name === 'timer' && !this.isActive) {
        this.setActiveTimer(this.timer.uid);
      } else if (this.$router.currentRoute.name === 'timer') {
        this.resetTimer();
      }

      this.$router.push('/');
    },
    editItem() {
      this.$router.push(`/timer/${this.timer.uid}`);
    },
    getMinSec(secs) {
      const mmt = moment(secs * 1000);
      this.minutes = mmt.minute();
      this.seconds = mmt.second();
    }
  },
};
</script>
