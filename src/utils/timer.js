import { roundTime } from './helpers';

export const TIMER_STATUSES = {
  STOPPED: -1,
  PAUSED: 0,
  PLAYING: 1,
  EXPIRED: 2,
  RESET: 3
};


export class Timer {
  /**
   * Construct a Timer object
   */
  constructor() {
    this.setDuration(0);
    this._previousTime = 0;
    this._timer = null;
    this._running = false;
    this._updateCounter = 0;
    this.runId = null;

    this.updateTime = this.updateTime.bind(this);
  }

  /**
   * Set a callback to be fired upon timer expiry
   *
   * @param {function} cb: function to call
   */
  setCompletionCallback(cb) {
    this.completionCallback = cb;
  }

  /**
   * Set a duration for the timer.
   *
   * @param {number} duration: duration of timer
   */
  setDuration(duration) {
    this.initialDuration = duration;
    this.timeRemaining = duration;
  }

  /**
   * Set a run ID
   */
  setRunId(runId) {
    this.runId = runId;
  }

  /**
   * Set a callback to be fired on each tick
   *
   * @param {function} cb: function to call
   */
  setTickCallback(cb) {
    this.tickCallback = cb;
  }

  /**
   * Start a timer.
   */
  start() {
    this.stop();

    this._running = true;
    this._previousTime = roundTime(Date.now());

    // Note the use of 100ms granularity here. By ticking 10 times per second
    // and rounding, we can accomodate for a timer drift attributed to CPU
    // scheduling
    this._timer = window.setInterval(this.updateTime, 100);
  }

  /**
   * Stop a timer.
   */
  stop() {
    this._running = false;

    if (this._timer) {
      window.clearInterval(this._timer);
      this._timer = null;
    }
  }

  /**
   * Update a timer
   */
  updateTime() {
    if (!this._running) return;

    const currentTime = roundTime(Date.now());
    const delta = currentTime - this._previousTime;
    this._previousTime = currentTime;
    this.timeRemaining -= delta;
    this._updateCounter++;

    if (this.timeRemaining > 0) {
      this.tickCallback(this.timeRemaining);
    } else {
      this.stop();
      this.tickCallback(0);
      this.completionCallback();
      this._updateCounter = 0;
      this.timeRemaining = 0;
    }
  }
}
