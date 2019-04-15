<template>
  <timer-face>
    <timer-controls />
  </timer-face>
</template>

<script>
import TimerFace from '../components/TimerFace';
import TimerControls from '../components/TimerControls';


export default {
  name: 'Timer',
  components: {
    'timer-face': TimerFace,
    'timer-controls': TimerControls,
  },
};
</script>
