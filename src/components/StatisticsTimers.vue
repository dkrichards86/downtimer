<script>
import { Bar } from 'vue-chartjs';
import { secToHHMMSS } from '../utils/helpers';

export default {
  name: 'StatisticsTimers',
  mixins: [Bar],
  props: {
    starts: {
      type: Object,
      required: true
    },
    completions: {
      type: Object,
      required: true
    }
  },
  watch: {
    starts: {
      handler: function () {
        const { starts, completions } = this.setData();
        this.render(starts, completions);
      },
      deep: true
    },
    completions: {
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
      const starts = Object.entries(this.starts).map(d => {
        return { x: d[0], y: d[1].duration };
      });

      const completions = Object.entries(this.completions).map(d => {
        return { x: d[0], y: d[1].duration };
      });

      return { starts, completions };
    },
    render(starts, completions) {
      const datasets = [
        {
          label: 'Time Scheduled',
          yAxisID: 'time',
          data: starts,
          borderColor: '#f57c00',
          backgroundColor: 'rgba(245, 124, 0, 0.6)'
        },
        {
          label: 'Time Completed',
          yAxisID: 'time',
          data: completions,
          borderColor: '#388e3c',
          backgroundColor: 'rgba(56, 142, 60, 0.6)'
        }
      ];

      const datacollection = { datasets };

      const options = {
        title: {
          display: true,
          text: 'Daily Utilization',
          fontFamily: "'Roboto', sans-serif",
          fontSize: 12,
        },
        legend: {
          display: false
        },
        tooltips: {
          intersect: false,
          mode: 'index',
          callbacks: {
            title: tooltipItems => tooltipItems[0].xLabel,
            label: (tooltipItem, data) => {
              const prefix = data.datasets[tooltipItem.datasetIndex].label;
              let value = tooltipItem.yLabel;
              if (tooltipItem.datasetIndex !== 2) {
                value = secToHHMMSS(tooltipItem.yLabel);
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
            },
            gridLines: {
              display: false
            },
            offset: true
          }],
          yAxes: [
            {
              id: 'time',
              position: 'left',
              gridLines: {
                display: false
              },
              ticks: {
                beginAtZero: true,
                callback: secToHHMMSS,
              }
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
