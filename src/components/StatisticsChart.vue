<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import groupBy from 'lodash/groupBy';
import { Bar } from 'vue-chartjs';

Array.prototype.max = function () {
  return Math.max.apply(null, this);
};

export default {
  name: 'StatisticsChart',
  mixins: [Bar],
  data() {
    return {
      htmlLegend: null
    };
  },
  computed: {
    ...mapGetters([
      'getHistory', 'getStatsInterruptions', 'getStatsWindow'
    ]),
  },
  mounted() {
    this.setData(this.getHistory);
    this.htmlLegend = this.generateLegend();
  },
  watch: {
    getHistory(history) {
      this.setData(history);
    },
    getStatsInterruptions() {
      this.setData(this.getHistory);
    },
    getStatsWindow() {
      this.setData(this.getHistory);
    },
  },
  methods: {
    setData(history) {
      const today = moment();
      const dayObj = {};
      dayObj[today.format('MMM D')] = 0;
      [...Array(this.getStatsWindow - 1)].forEach(_ => { dayObj[today.subtract(1, 'd').format('MMM D')] = 0; }); // eslint-disable-line no-unused-vars
      const groups = groupBy(history.filter(e => e.runId), (e) => moment(e.datetime).format('MMM D'));

      const starts = Object.assign({}, dayObj);
      const stops = Object.assign({}, dayObj);
      const completions = Object.assign({}, dayObj);

      Object.entries(groups).forEach((group) => {
        const [date, events] = [...group];

        if (date in dayObj) {
          events.forEach(e => {
            switch (e.event) {
              case 'start':
                starts[date] += 1;
                break;
              case 'expiry':
                completions[date] += 1;
                break;
              case 'pause':
                stops[date] += 1;
                break;
              default:
                break;
            }
          });
        }
      });

      const datasets = [];

      const maxStarts = Object.entries(starts).map(d => d[1]).max();
      const maxStops = Object.entries(stops).map(d => d[1]).max();
      const maxCompletions = Object.entries(completions).map(d => d[1]).max();
      const max = Math.ceil([maxStarts, maxStops, maxCompletions].max() * 1.2);

      datasets.push({
        label: 'Timers Completed',
        data: Object.entries(completions).map(d => ({ x: d[0], y: d[1] })),
        borderColor: '#388e3c',
        backgroundColor: 'rgba(56, 142, 60, 0.6)',
      });

      datasets.push({
        label: 'Timers Started',
        data: Object.entries(starts).map(d => ({ x: d[0], y: d[1] - completions[d[0]] })),
        borderColor: '#f57c00',
        backgroundColor: 'rgba(245, 124, 0, 0.6)',
      });

      if (this.getStatsInterruptions) {
        datasets.push({
          label: 'Interruptions',
          fill: false,
          data: Object.entries(stops).map(d => ({ x: d[0], y: d[1] })),
          borderColor: 'rgba(211, 47, 47, 0.8)',
          pointBorderColor: '#d32f2f',
          pointBackgroundColor: '#d32f2f',
          backgroundColor: 'rgba(211, 47, 47, 0.8)',
          lineTension: 0.2,
          type: 'line'
        });
      }

      const datacollection = { datasets };

      const options = {
        legend: {
          position: 'bottom',
          labels: {
            fontFamily: "'Roboto', sans-serif",
            fontSize: 12,
            boxWidth: 20
          },
          reverse: true
        },
        tooltips: {
          enabled: false
        },
        animation: {
          duration: 0,
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day'
            },
            offset: true,
            stacked: true,
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: max
            },
            stacked: true,
          }]
        },
        responsive: true,
        maintainAspectRatio: false
      };

      this.renderChart(datacollection, options);
    }
  }
};
</script>
