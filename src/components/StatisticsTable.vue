<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :disable-initial-sort="true"
    :rows-per-page-items="[7,14,28]">
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.percentage }}</td>
      <td class="text-xs-right">{{ props.item.interruptions }}</td>
      <td class="text-xs-right">{{ props.item.starts }}</td>
      <td class="text-xs-right">{{ props.item.completions }}</td>
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment';
import { secToHHMMSS } from '../utils/helpers';

const rounder = (value, decimals = 2) => {
  return Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);
};

export default {
  name: 'StatisticsTimers',
  props: {
    starts: {
      type: Object,
      required: true
    },
    completions: {
      type: Object,
      required: true
    },
    days: {
      type: Array,
      required: true
    },
    interruptions: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      items: [],
      headers: [
        { text: 'Date', value: 'date', sortable: false },
        { text: 'Completion %', value: 'percentage' },
        { text: 'Interruptions', value: 'interruptions' },
        { text: 'Timers Started', value: 'starts' },
        { text: 'Timers Completed', value: 'completions' }
      ]
    };
  },
  watch: {
    starts: {
      handler: function () {
        this.setData();
      },
      deep: true
    },
    completions: {
      handler: function () {
        this.setData();
      },
      deep: true
    },
    interruptions: {
      handler: function () {
        this.setData();
      },
      deep: true
    }
  },
  mounted() {
    this.setData();
  },
  methods: {
    setData() {
      this.items = this.days.map(day => {
        const starts = this.starts[day].duration;
        const completions = this.completions[day].duration;
        let percentage = '0%';

        if (completions !== 0) {
          percentage = `${rounder(completions / starts) * 100}%`;
        }

        return {
          name: moment(day).format('ddd MMM D'),
          starts: secToHHMMSS(starts),
          completions: secToHHMMSS(completions),
          percentage: percentage,
          interruptions: this.interruptions[day].count
        };
      });
    }
  }
};
</script>
