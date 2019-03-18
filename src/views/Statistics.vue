<template>
  <div>
    <v-card class="mb-4">
      <v-card-text>
        <statistics-controls />
      </v-card-text>
    </v-card>
    <v-card class="mb-4">
      <v-card-text>
        <statistics-timers
          :style="{height: '180px'}"
          :starts="starts"
          :completions="completions" />
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-text>
        <statistics-table
          :days="days"
          :starts="starts"
          :completions="completions"
          :interruptions="interruptions" />
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
import StatisticsTable from '../components/StatisticsTable';
import StatisticsControls from '../components/StatisticsControls';

import { Storage } from '../utils/storage';

const runStorage = new Storage('runs');
const eventStorage = new Storage('events');

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
    'statistics-table': StatisticsTable,
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
  mounted() {
    this.parseData();
  },
  watch: {
    getStatsWindow() {
      this.parseData();
    }
  },
  methods: {
    parseData() {
      const runs = runStorage.load();
      const events = eventStorage.load();

      if (!runs || !events) return;

      runs.forEach(r => { this.runs[r.runId] = r.duration; });
      this.events = events;

      const today = moment();
      const dayObj = {};
      const dayShape = { duration: 0, count: 0 };

      dayObj[today.startOf('day')] = { ...dayShape };
      [...Array(this.getStatsWindow - 1)].forEach(() => { dayObj[today.subtract(1, 'd').startOf('day')] = { ...dayShape }; });

      const groups = groupBy(this.events.filter(e => e.runId), (e) => moment(e.datetime * 1000).startOf('day'));

      this.starts = cloneDeep(dayObj);
      this.interruptions = cloneDeep(dayObj);
      this.completions = cloneDeep(dayObj);
      this.days = Object.keys(dayObj);

      Object.entries(groups).forEach((group) => {
        const [groupDate, groupEvents] = [...group];

        if (groupDate in dayObj) {
          const _runs = groupBy(groupEvents, 'runId');

          Object.entries(_runs).forEach((r) => {
            const [runId, runEvents] = [...r];

            const pauses = runEvents.map(e => e.event === 'pause').filter(e => e);
            if (pauses) {
              this.interruptions[groupDate].count += pauses.length;
            }

            if (find(runEvents, e => e.event === 'start')) {
              this.starts[groupDate].duration += this.runs[runId];
              this.starts[groupDate].count += 1;
            }

            if (find(runEvents, e => e.event === 'expiry')) {
              this.completions[groupDate].duration += this.runs[runId];
              this.completions[groupDate].count += 1;
            } else {
              let state = '';
              let time = 0;
              const timeCompleted = runEvents.reduce((acc, curr) => {
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

              this.completions[groupDate].duration += timeCompleted;
            }
          });
        }
      });
    }
  }
};
</script>
