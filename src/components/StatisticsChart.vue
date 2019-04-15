<script>
import moment from 'moment';
import { Line } from 'vue-chartjs';
import { timeFormat } from '../utils/helpers';

const X_AXES = [
  {
    type: 'time',
    time: {
      unit: 'day'
    }
  }
];

const Y_AXES = [
  {
    display: false
  }
];

const SCALES = {
  xAxes: X_AXES,
  yAxes: Y_AXES
};

const LEGEND = {
  display: false
};

const COMPLETED_COLOR = '#34495E';
const SCHEDULED_COLOR = '#B71C1C';

export default {
  name: 'StatisticsChart',
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
          borderColor: COMPLETED_COLOR,
          backgroundColor: COMPLETED_COLOR,
          fill: false,
          pointStyle: 'line',
          lineTension: 0
        },
        {
          label: 'Time Scheduled',
          data: starts,
          borderColor: SCHEDULED_COLOR,
          backgroundColor: SCHEDULED_COLOR,
          fill: false,
          pointStyle: 'line',
          lineTension: 0
        }
      ];

      const datacollection = { datasets };

      const options = {
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
        legend: LEGEND,
        scales: SCALES,
        responsive: true,
        maintainAspectRatio: false
      };

      this.renderChart(datacollection, options);
    }
  }
};
</script>
