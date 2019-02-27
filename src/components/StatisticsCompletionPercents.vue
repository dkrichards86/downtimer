<script>
import moment from 'moment';
import { Bar } from 'vue-chartjs';

const rounder = (value, decimals = 2) => {
  return Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);
};

export default {
  name: 'StatisticsChart',
  mixins: [Bar],
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
  },
  watch: {
    starts: {
      handler: function () {
        const days = this.setData();
        this.render(days);
      },
      deep: true
    },
    completions: {
      handler: function () {
        const days = this.setData();
        this.render(days);
      },
      deep: true
    }
  },
  mounted() {
    const days = this.setData();
    this.render(days);
  },
  methods: {
    setData() {
      const dow = [...Array(7)].map(() => ({ num: 0, denom: 0 }));

      this.days.forEach(e => {
        const mmt = moment(e);
        dow[mmt.day()].num += this.completions[e].duration;
        dow[mmt.day()].denom += this.starts[e].duration;
      });

      const days = dow.map(d => {
        if (d.denom === 0) {
          return 0;
        }

        return d.num / d.denom;
      });

      return days;
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
          text: 'Percent Completion by Day of Week',
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
            label: tooltipItem => `${rounder(tooltipItem.yLabel * 100)}%`
          }
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
                beginAtZero: true,
                min: 0,
                max: 1,
                callback: v => `${v * 100}%`
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
