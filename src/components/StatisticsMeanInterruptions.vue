<script>
import moment from 'moment';
import { Bar } from 'vue-chartjs';

export default {
  name: 'StatisticsMeanInterruptions',
  mixins: [Bar],
  props: {
    stops: {
      type: Object,
      required: true
    },
    days: {
      type: Array,
      required: true
    },
  },
  watch: {
    stops: {
      handler: function () {
        const means = this.setData();
        this.render(means);
      },
      deep: true
    }
  },
  mounted() {
    const means = this.setData();
    this.render(means);
  },
  methods: {
    setData() {
      const dow = [...Array(7)].map(() => []);

      this.days.forEach(e => {
        const mmt = moment(e);
        dow[mmt.day()].push(this.stops[e].count);
      });

      const means = dow.map(d => {
        const values = d.filter(_d => _d !== 0);
        const num = values.reduce((acc, curr) => acc + curr, 0);
        const denom = values.length;

        if (denom === 0) {
          return 0;
        }

        return num / denom;
      });

      return means;
    },
    render(data) {
      const datacollection = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
          {
            data: data,
            borderColor: '#388e3c',
            backgroundColor: 'rgba(56, 142, 60, 0.6)'
          }
        ]
      };

      const options = {
        title: {
          display: true,
          text: 'Average Interruptions by Day of Week',
          fontFamily: "'Roboto', sans-serif",
          fontSize: 12,
        },
        legend: {
          display: false
        },
        tooltips: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            offset: true,
          }],
          yAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                beginAtZero: true
              },
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
