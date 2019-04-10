<template>
  <v-snackbar bottom right :timeout="0" :value="true">
    Update Available!
    <v-btn @click="refresh()" flat pink>
      Click to Reload
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SWReloadSnackbar',
  methods: {
    refresh() {
      window.location.reload();
    }
  }
};
</script>
