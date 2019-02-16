<template>
  <v-card class="px-3 py-2">
    <v-card-title primary-title class="headline">
      Timer History
    </v-card-title>
    <v-card-text>
      <statistics-chart />
      <v-divider class="my-4" />
      <statistics-controls />
    </v-card-text>
  </v-card>
</template>

<script>
import StatisticsChart from '../components/StatisticsChart';
import StatisticsControls from '../components/StatisticsControls';

export default {
  name: 'Statistics',
  components: {
    'statistics-chart': StatisticsChart,
    'statistics-controls': StatisticsControls
  }
};
</script>
