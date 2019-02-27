<script>
import { Line } from 'vue-chartjs';

export default {
  name: 'StatisticsDailyInterruptions',
  mixins: [Line],
  props: {
    interruptions: {
      type: Object,
      required: true
    }
  },
  watch: {
    interruptions: {
      handler: function () {
        const stops = this.setData();
        this.render(stops);
      },
      deep: true
    }
  },
  mounted() {
    const stops = this.setData();
    this.render(stops);
  },
  methods: {
    setData() {
      return Object.entries(this.interruptions).map(d => {
        return { x: d[0], y: d[1].count };
      });
    },
    render(stops) {
      const datasets = [
        {
          label: 'Interruptions',
          fill: false,
          data: stops,
          borderColor: 'rgba(211, 47, 47, 0.8)',
          pointBorderColor: '#d32f2f',
          pointBackgroundColor: '#d32f2f',
          backgroundColor: 'rgba(211, 47, 47, 0.8)',
          lineTension: 0.2,
          type: 'line'
        }
      ];

      const datacollection = { datasets };

      const options = {
        title: {
          display: true,
          text: 'Daily Interruptions',
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
            title: tooltipItems => tooltipItems[0].xLabel
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
              gridLines: {
                display: false
              },
              ticks: {
                beginAtZero: true
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
