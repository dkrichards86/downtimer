<template>
  <v-list-group
    prepend-icon="alarm"
    color="primary"
    value="true">
    <v-list-tile slot="activator">
      <v-list-tile-title>
        Timers
      </v-list-tile-title>
    </v-list-tile>
    <timer-list-item
      v-for="timer in getTimers"
      :key="timer.uid"
      :timer="timer" />
    <v-list-tile to='/timer'>
     <v-list-tile-action />
      <v-list-tile-title>
        Add a New Timer
      </v-list-tile-title>
       <v-list-tile-action>
        <v-icon small color="primary">
          add
        </v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </v-list-group>
</template>

<script>
import { mapGetters } from 'vuex';
import WrapperSidebarTimerListItem from './WrapperSidebarTimerListItem.vue';

export default {
  name: 'WrapperSidebarTimerList',
  components: {
    'timer-list-item': WrapperSidebarTimerListItem
  },
  computed: {
    ...mapGetters([
      'getTimers'
    ]),
  }
};
</script>
