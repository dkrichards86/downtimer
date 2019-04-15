<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :disable-initial-sort="true"
    :rows-per-page-items="perPage">
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-center">{{ timeFormat(props.item.starts) }}</td>
      <td class="text-xs-center">{{ timeFormat(props.item.completions) }}</td>
      <td class="text-xs-center">{{ `${props.item.percentage* 100}%` }}</td>
      <td class="text-xs-center">{{ props.item.interruptions }}</td>
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import { timeFormat, rounder } from '../utils/helpers';

const HEADERS = [
  {
    text: 'Date', value: 'date', sortable: false,
  },
  {
    text: 'Timers Started', value: 'starts', align: 'center',
  },
  {
    text: 'Timers Completed', value: 'completions', align: 'center',
  },
  {
    text: '% Completed', value: 'percentage', align: 'center',
  },
  {
    text: '# Interruptions', value: 'interruptions', align: 'center',
  },
];

const PER_PAGE_MAP = {
  7: [7],
  14: [7, 14],
  28: [7, 14, 28],
};

export default {
  name: 'StatisticsTable',
  props: {
    stats: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      items: [],
      headers: HEADERS,
    };
  },
  computed: {
    ...mapGetters([
      'getStatsWindow',
    ]),
    perPage() {
      return PER_PAGE_MAP[this.getStatsWindow];
    },
  },
  watch: {
    stats: {
      handler: function () {
        this.setData();
      },
      deep: true,
    },
  },
  mounted() {
    this.setData();
  },
  methods: {
    setData() {
      this.items = Object.entries(this.stats).map(elem => {
        const day = elem[0];
        const data = elem[1];

        const starts = data.started;
        const completions = data.completed;
        let percentage = 0;

        if (completions !== 0) {
          percentage = rounder(completions / starts);
        }

        return {
          name: moment(day).format('ddd MMM D'),
          starts: starts,
          completions: completions,
          percentage: percentage,
          interruptions: data.interruptions,
        };
      });
    },
    timeFormat(secs) {
      return timeFormat(secs);
    },
  },
};
</script>
