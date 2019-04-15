<template>
  <v-snackbar bottom right :timeout="0" :value="true">
    Rate your Productivity!
    <v-rating v-model="rating" :length="5" size="24" color="white" />
    <v-btn flat pink @click="rateTimer()">
      Done
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'TimerRatingSnackbar',
  data() {
    return {
      rating: 3,
    };
  },
  methods: {
    ...mapActions([
      'setRating',
    ]),
    rateTimer() {
      this.setRating(this.rating);
    },
  },
};
</script>
