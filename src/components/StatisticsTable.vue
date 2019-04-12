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
import { timeFormat } from '../utils/helpers';

const rounder = (value, decimals = 2) => {
  return Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);
};

export default {
  name: 'StatisticsTable',
  props: {
    stats: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      items: [],
      headers: [
        {
          text: 'Date', value: 'date', sortable: false,
        },
        {
          text: 'Timers Started', value: 'starts', align: 'center'
        },
        {
          text: 'Timers Completed', value: 'completions', align: 'center'
        },
        {
          text: '% Completed', value: 'percentage', align: 'center'
        },
        {
          text: '# Interruptions', value: 'interruptions', align: 'center'
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'getStatsWindow'
    ]),
    perPage() {
      const perPageMap = {
        7: [7],
        14: [7, 14],
        28: [7, 14, 28]
      };

      return perPageMap[this.getStatsWindow];
    }
  },
  watch: {
    stats: {
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
          interruptions: data.interruptions
        };
      });
    },
    timeFormat(secs) {
      return timeFormat(secs);
    }
  }
};
</script>
