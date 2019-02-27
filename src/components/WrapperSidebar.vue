<template>
  <v-list>
    <v-list-tile to='/'>
      <v-list-tile-action>
        <v-icon>
          home
        </v-icon>
      </v-list-tile-action>
      <v-list-tile-title>
        Home
      </v-list-tile-title>
    </v-list-tile>
    <timer-list />
    <v-list-tile to='/timer'>
      <v-list-tile-action>
        <v-icon>
          alarm_add
        </v-icon>
      </v-list-tile-action>
      <v-list-tile-title>
        Add a New Timer
      </v-list-tile-title>
    </v-list-tile>
    <v-list-tile to='/statistics'>
      <v-list-tile-action>
        <v-icon>
          history
        </v-icon>
      </v-list-tile-action>
      <v-list-tile-title>
        Statistics
      </v-list-tile-title>
    </v-list-tile>
    <v-list-tile to='/settings'>
      <v-list-tile-action>
        <v-icon>
          settings
        </v-icon>
      </v-list-tile-action>
      <v-list-tile-title>
        Settings
      </v-list-tile-title>
    </v-list-tile>
    <v-list-tile
      v-if="showInstaller"
      @click="installer()">
      <v-list-tile-action>
        <v-icon>
          get_app
        </v-icon>
      </v-list-tile-action>
      <v-list-tile-title>
        Get the Downtimer App
      </v-list-tile-title>
    </v-list-tile>
  </v-list>
</template>

<script>
import WrapperSidebarTimerList from './WrapperSidebarTimerList.vue';

export default {
  name: 'WrapperSidebar',
  components: {
    'timer-list': WrapperSidebarTimerList
  },
  data() {
    return {
      installer: null,
      showInstaller: false
    };
  },
  mounted() {
    let installPrompt;

    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      installPrompt = e;
      this.showInstaller = true;
    });

    this.installer = () => {
      installPrompt.prompt();
      installPrompt.userChoice.then(result => {
        if (result.outcome === 'accepted') {
          this.showInstaller = false;
        }
      });
    };
  }
};
</script>
