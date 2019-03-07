import { Howl } from 'howler';
import arpeggio from '@/assets/sounds/arpeggio.mp3';
import coins from '@/assets/sounds/coins.mp3';
import definite from '@/assets/sounds/definite.mp3';
import notbad from '@/assets/sounds/not-bad.mp3';
import silence from '@/assets/sounds/silence.mp3';

const CHIMES = {
  arpeggio, coins, definite, notbad, silence
};

const play = (chime) => {
  const alertChime = new Howl({src: [CHIMES[chime]]});
  alertChime.play();
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
