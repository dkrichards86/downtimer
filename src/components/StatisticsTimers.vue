<script>
import moment from 'moment';
import { Line } from 'vue-chartjs';
import { timeFormat } from '../utils/helpers';

export default {
  name: 'StatisticsTimers',
  mixins: [Line],
  props: {
    stats: {
      type: Object,
      required: true
    }
  },
  watch: {
    stats: {
      handler: function () {
        const { starts, completions } = this.setData();
        this.render(starts, completions);
      },
      deep: true
    }
  },
  mounted() {
    const { starts, completions } = this.setData();
    this.render(starts, completions);
  },
  methods: {
    setData() {
      const starts = [];
      const completions = [];

      Object.entries(this.stats).forEach(elem => {
        const day = elem[0];
        const data = elem[1];

        starts.push({ x: moment(day), y: data.started });
        completions.push({ x: moment(day), y: data.completed });
      });

      return { starts, completions };
    },
    render(starts, completions) {
      if (starts.length === 0 || completions.length === 0) return;

      const datasets = [
        {
          label: 'Time Completed',
          data: completions,
          borderColor: '#34495E',
          backgroundColor: '#34495E',
          fill: false,
          pointStyle: 'line',
          lineTension: 0
        },
        {
          label: 'Time Scheduled',
          data: starts,
          borderColor: '#B71C1C',
          backgroundColor: '#B71C1C',
          fill: false,
          pointStyle: 'line',
          lineTension: 0
        }
      ];

      const datacollection = { datasets };

      const options = {
        legend: {
          display: false
        },
        tooltips: {
          intersect: false,
          mode: 'index',
          callbacks: {
            title: tooltipItems => moment(tooltipItems[0].xLabel).format('ddd MMM D'),
            label: (tooltipItem, data) => {
              const prefix = data.datasets[tooltipItem.datasetIndex].label;
              let value = tooltipItem.yLabel;
              if (tooltipItem.datasetIndex !== 2) {
                value = timeFormat(tooltipItem.yLabel);
              }

              return `${prefix}: ${value}`;
            }
          }
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day'
            }
          }],
          yAxes: [
            {
              display: false
            }
          ]
        },
        responsive: true,
        maintainAspectRatio: false
      };

      this.renderChart(datacollection, options);
    }
  }
};
</script>
