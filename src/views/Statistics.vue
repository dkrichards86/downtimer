<template>
  <div>
    <div v-if="hasData">
      <v-card class="mb-4">
        <v-card-text>
          <v-card-title class="title">
            Daily Usage
          </v-card-title>
          <statistics-timers :style="{height: '180px'}" :stats="stats" />
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-card-title class="title">
            Usage Details
          </v-card-title>
          <statistics-table :stats="stats" />
        </v-card-text>
      </v-card>
    </div>
    <div v-else>
      <v-card>
        <v-card-text>
          No timers have run in the selected time window.
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import groupBy from 'lodash/groupBy';
import find from 'lodash/find';

import StatisticsTimers from '../components/StatisticsTimers';
import StatisticsTable from '../components/StatisticsTable';

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
    'statistics-table': StatisticsTable
  },
  data() {
    return {
      runs: {},
      events: [],
      stats: {},
      hasData: false
    };
  },
  computed: {
    ...mapGetters([
      'getStatsWindow', 'getTimerStatus'
    ]),
  },
  mounted() {
    this.parseData();
  },
  watch: {
    getStatsWindow() {
      this.parseData();
    },
    getTimerStatus() {
      this.parseData();
    }
  },
  methods: {
    parseData() {
      const runs = runStorage.load();
      const events = eventStorage.load();
      this.hasData = false;

      if (!runs || !events) {
        return;
      }

      runs.forEach(r => { this.runs[r.runId] = r.duration; });
      this.events = events;

      const today = moment();
      const statsData = {};
      const dayShape = { started: 0, completed: 0, interruptions: 0 };

      statsData[today.startOf('day')] = { ...dayShape };
      [...Array(this.getStatsWindow - 1)].forEach(() => { statsData[today.subtract(1, 'd').startOf('day')] = { ...dayShape }; });

      const groups = groupBy(this.events.filter(e => e.runId), (e) => moment(e.datetime * 1000).startOf('day'));

      Object.entries(groups).forEach((group) => {
        const [groupDate, groupEvents] = [...group];

        if (groupDate in statsData) {
          this.hasData = true;
          const _runs = groupBy(groupEvents, 'runId');

          Object.entries(_runs).forEach((r) => {
            const [runId, runEvents] = [...r];

            const pauses = runEvents.map(e => e.event === 'pause').filter(e => e);
            if (pauses) {
              statsData[groupDate].interruptions += pauses.length;
            }

            if (find(runEvents, e => e.event === 'start')) {
              statsData[groupDate].started += this.runs[runId];
            }

            if (find(runEvents, e => e.event === 'expiry')) {
              statsData[groupDate].completed += this.runs[runId];
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

              statsData[groupDate].completed += timeCompleted;
            }
          });
        }
      });

      this.stats = statsData;
    }
  }
};
</script>
