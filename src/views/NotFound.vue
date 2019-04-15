<template>
  <v-card class="px-3 py-2">
    <v-card-title class="headline">
      Page Not Found
    </v-card-title>
    <v-card-text>
      That page cannot be found.
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        flat
        to="/">
        Go Home
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>
