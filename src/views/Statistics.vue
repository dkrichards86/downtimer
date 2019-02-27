<template>
  <div>
    <v-card class="mb-4">
      <v-card-text>
        <statistics-controls />
      </v-card-text>
    </v-card>
    <v-card class="mb-4">
      <v-card-text>
        <statistics-timers :starts="starts" :completions="completions" />
      </v-card-text>
    </v-card>
    <v-card class="mb-4">
      <v-card-text>
        <statistics-percents :starts="starts" :completions="completions" :days="days" />
      </v-card-text>
    </v-card>
    <v-card class="mb-4">
      <v-card-text>
        <statistics-interruptions :interruptions="interruptions" />
      </v-card-text>
    </v-card>
    <v-card class="mb-4">
      <v-card-text>
        <statistics-means :stops="interruptions" :days="days" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import groupBy from 'lodash/groupBy';
import find from 'lodash/find';
import cloneDeep from 'lodash/cloneDeep';

import StatisticsTimers from '../components/StatisticsTimers';
import StatisticsCompletionPercents from '../components/StatisticsCompletionPercents';
import StatisticsDailyInterruptions from '../components/StatisticsDailyInterruptions';
import StatisticsMeanInterruptions from '../components/StatisticsMeanInterruptions';
import StatisticsControls from '../components/StatisticsControls';

import { loadEvents, loadRuns } from '../utils/database';

const TRANSITIONS = {
  start: ['pause', 'exit', 'expiry', 'reset'],
  resume: ['pause', 'exit', 'expiry', 'reset'],
  pause: ['resume', 'reset'],
  exit: [],
  reset: ['start'],
  '': ['start']
};

export default {
  name: 'Statistics',
  components: {
    'statistics-timers': StatisticsTimers,
    'statistics-percents': StatisticsCompletionPercents,
    'statistics-interruptions': StatisticsDailyInterruptions,
    'statistics-means': StatisticsMeanInterruptions,
    'statistics-controls': StatisticsControls
  },
  data() {
    return {
      runs: {},
      events: [],
      starts: {},
      completions: {},
      interruptions: {},
      days: []
    };
  },
  computed: {
    ...mapGetters([
      'getStatsWindow'
    ]),
  },
  watch: {
    getStatsWindow() {
      this.parseData();
    }
  },
  mounted() {
    Promise.all([loadRuns(), loadEvents()])
      .then(resolution => {
        const [runs, events] = resolution;
        runs.forEach(r => { this.runs[r.runId] = { duration: r.duration, title: r.title }; });
        this.events = events;
        this.parseData();
      });
  },
  methods: {
    parseData() {
      const today = moment();
      const dayObj = {};
      const dayShape = { duration: 0, count: 0 };

      dayObj[today.format('MMM D')] = { ...dayShape };
      [...Array(this.getStatsWindow - 1)].forEach(() => { dayObj[today.subtract(1, 'd').format('MMM D')] = { ...dayShape }; });

      const groups = groupBy(this.events.filter(e => e.runId), (e) => moment(e.datetime).format('MMM D'));

      this.starts = cloneDeep(dayObj);
      this.interruptions = cloneDeep(dayObj);
      this.completions = cloneDeep(dayObj);
      this.days = Object.keys(dayObj);

      Object.entries(groups).forEach((group) => {
        const [date, events] = [...group];

        if (date in dayObj) {
          const _runs = groupBy(events, 'runId');

          Object.entries(_runs).forEach((r) => {
            const [runId, _events] = [...r];

            const pauses = _events.map(e => e.event === 'pause').filter(e => e);
            if (pauses) {
              this.interruptions[date].count += pauses.length;
            }

            if (find(_events, e => e.event === 'start')) {
              this.starts[date].duration += this.runs[runId].duration;
              this.starts[date].count += 1;
            }

            if (find(_events, e => e.event === 'expiry')) {
              this.completions[date].duration += this.runs[runId].duration;
              this.completions[date].count += 1;
            } else {
              let state = '';
              let time = 0;
              const timeCompleted = _events.reduce((acc, curr) => {
                const evt = curr.event;
                const _trans = TRANSITIONS[state];
                let val = 0;

                if (_trans.indexOf(evt) !== -1 && state !== '') {
                  val += curr.datetime - time;
                }

                time = curr.datetime;
                state = evt;
                return acc + val;
              }, 0);

              this.completions[date].duration += Math.floor(timeCompleted / 1000);
            }
          });
        }
      });
    }
  }
};
</script>
