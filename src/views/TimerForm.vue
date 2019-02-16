<template>
  <v-card class="px-3 py-2">
    <v-card-title primary-title class="headline">
      {{ headline }}
    </v-card-title>
    <v-card-text>
      <v-text-field
        label="Timer Title"
        v-model="title" />
      <v-layout align-center>
        <v-flex xs2>
          <div class="body-1 text-xs-center">
            Duration
          </div>
          <div class="headline text-xs-center">
            {{ formattedDuration }}
          </div>
        </v-flex>
        <v-flex xs10 pa1>
          <v-slider
            v-model="minutes"
            :max="59"
            label="Minutes"
            thumb-label />
          <v-slider
            v-model="seconds"
            :max="55"
            :step="5"
            label="Seconds"
            thumb-label />
        </v-flex>
      </v-layout>
      <v-alert
        :value="!!titleError"
        color="error"
        icon="warning"
        outline
      >
        {{ titleError }}
      </v-alert>
      <v-alert
        :value="!!timerError"
        color="error"
        icon="warning"
        outline
      >
        {{ timerError }}
      </v-alert>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="isEdit"
        color="error"
        flat="flat"
        @click="removeItem">
        Delete
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        flat="flat"
        @click="closeDialog">
        Cancel
      </v-btn>
      <v-btn
        :disabled="!isValid()"
        color="primary"
        @click="saveItem">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment';
import get from 'lodash/get';
import shortid from 'shortid';
import { mapActions, mapGetters } from 'vuex';
import { timeFormat } from '../utils/helpers';

export default {
  name: 'TimerForm',
  data() {
    return {
      headline: '',
      uid: '',
      isEdit: false,
      title: '',
      minutes: 0,
      seconds: 0,
      titleError: null,
      timerError: null
    };
  },
  computed: {
    ...mapGetters([
      'getTimerById'
    ]),
    formattedDuration() {
      return timeFormat((this.minutes * 60) + this.seconds);
    }
  },
  watch: {
    '$route'(to) {
      this.setTimer(to.params.id);
    },
    title(newTitle) {
      this.titleError = null;

      if (!newTitle) {
        this.titleError = 'Title is required.';
      }
    },
    minutes(newVal) {
      this.validateTimer(newVal, this.seconds);
    },
    seconds(newVal) {
      this.validateTimer(this.minutes, newVal);
    }
  },
  created() {
    const timerId = get(this.$route, 'params', null);

    if (timerId) {
      this.setTimer(this.$route.params.id);
    }
  },
  methods: {
    ...mapActions([
      'updateTimers', 'removeTimer', 'updateTimers'
    ]),
    closeDialog() {
      this.$router.push('/');
    },
    getMinSec(secs) {
      const mmt = moment(secs * 1000);
      this.minutes = mmt.minute();
      this.seconds = mmt.second();
    },
    isValid() {
      return !this.titleError && !this.timerError;
    },
    removeItem() {
      if (this.isEdit) {
        this.removeTimer(this.uid);
        this.closeDialog();
      }
    },
    saveItem() {
      if (this.isValid()) {
        const secs = (this.minutes * 60) + this.seconds;
        const payload = {
          title: this.title,
          duration: secs,
          uid: this.uid
        };
        this.updateTimers(payload);
        this.closeDialog();
      }
    },
    setTimer(uid) {
      let duration = {
        title: 'New Timer',
        duration: '1200'
      };
      this.headline = 'New Timer';
      this.isEdit = false;
      this.uid = shortid();

      if (uid) {
        duration = this.getTimerById(uid);
        this.headline = 'Edit Timer';
        this.isEdit = true;
        this.uid = uid;
      }

      this.title = duration.title;
      this.getMinSec(duration.duration);
    },
    validateTimer(min, sec) {
      this.timerError = null;

      if (min === 0 && sec === 0) {
        this.timerError = 'The timer cannot be zero';
      }
    }
  }
};
</script>
