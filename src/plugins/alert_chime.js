import arpeggio from '@/assets/sounds/arpeggio.mp3';
import coins from '@/assets/sounds/coins.mp3';
import definite from '@/assets/sounds/definite.mp3';
import notbad from '@/assets/sounds/not-bad.mp3';
import silence from '@/assets/sounds/silence.mp3';

const CHIMES = {
  arpeggio, coins, definite, notbad, silence
};

const play = (chime) => {
  return new Promise((resolve, reject) => {
    if ('Audio' in window) {
      resolve();
    } else {
      reject(Error('Audio API not available'));
    }
  })
    .then(() => {
      const audio = new Audio(CHIMES[chime]);
      return audio.play();
    })
    .catch((err) => {
      /* eslint-disable no-console */
      console.log(err);
    });
};

const AlertChime = {
  install: (Vue) => {
    Vue.alert_chime = {
      play: play
    };
    Vue.prototype.$alert_chime = {
      play: play
    };
  }
};

export default AlertChime;
