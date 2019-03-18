<script>
import { Line } from 'vue-chartjs';
import { secToHHMMSS } from '../utils/helpers';

export default {
  name: 'StatisticsTimers',
  mixins: [Line],
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
      if (starts.length === 0 || completions.length === 0) return;

      const datasets = [
        {
          label: 'Time Scheduled',
          data: starts,
          borderColor: '#f57c00',
          backgroundColor: 'rgba(245, 124, 0, 0.6)',
          fill: false,
          pointStyle: 'line'
        },
        {
          label: 'Time Completed',
          data: completions,
          borderColor: '#388e3c',
          backgroundColor: 'rgba(56, 142, 60, 0.6)',
          fill: false,
          pointStyle: 'line'
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
