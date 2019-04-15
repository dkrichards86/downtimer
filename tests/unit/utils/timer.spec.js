import { Timer } from '@/utils/timer';
import * as chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

const { expect } = chai;

describe('utils/timer', () => {
  let timer;

  beforeEach(() => {
    timer = new Timer();
  });

  it('should construct a timer', () => {
    expect(timer.initialDuration).to.equal(0);
    expect(timer.timeRemaining).to.equal(0);
    expect(timer._previousTime).to.equal(0);
    expect(timer._timer).to.be.null;
    expect(timer._running).to.be.false;
  });

  it('should set a duration', () => {
    timer.setDuration(120);
    expect(timer.initialDuration).to.equal(120);
    expect(timer.timeRemaining).to.equal(120);
  });

  it('should set a completion callback', () => {
    const cb = () => {};
    timer.setCompletionCallback(cb);
    expect(timer.completionCallback).to.equal(cb);
  });

  it('should set a tick callback', () => {
    const cb = () => {};
    timer.setTickCallback(cb);
    expect(timer.tickCallback).to.equal(cb);
  });

  it('should start a timer', () => {
    const cb = () => {};
    timer.setDuration(120);
    timer.setTickCallback(cb);
    timer.setCompletionCallback(cb);

    timer.start();

    expect(timer._running).to.be.true;
    expect(timer._previousTime).to.exist;
    expect(timer._timer).to.exist;
  });

  it('should stop a timer', () => {
    const cb = () => {};
    timer.setDuration(120);
    timer.setTickCallback(cb);
    timer.setCompletionCallback(cb);
    timer.start();

    timer.stop();

    expect(timer._running).to.be.false;
    expect(timer._timer).to.be.null;
  });

  it('should update a timer', (done) => {
    const cb = () => {};
    const tickCB = sinon.stub();
    timer.setDuration(120);
    timer.setTickCallback(tickCB);
    timer.setCompletionCallback(cb);
    timer.start();

    setTimeout( () => {
      try {
        expect(tickCB).to.be.called;
        expect(timer._previousTime).to.exist;
        expect(timer.timeRemaining).to.be.below(timer.initialDuration);
        done();
      }
      catch(err) {
        done(err);
      }
    }, 1100 );
  });
  
  it('should not update a stopped timer', (done) => {
    const cb = () => {};
    const tickCB = sinon.stub();
    timer.setDuration(120);
    timer.setTickCallback(tickCB);
    timer.setCompletionCallback(cb);
    
    timer._running = false;
    timer.updateTime();

    setTimeout( () => {
      try {
        expect(tickCB).to.not.be.called;
        expect(timer._previousTime).to.equal(0);
        expect(timer.timeRemaining).to.equal(timer.initialDuration);
        done();
      }
      catch(err) {
        done(err);
      }
    }, 1100 );
  });

  it('should expire a timer', (done) => {
    const completionCB = sinon.stub();
    const tickCB = sinon.stub();
    timer.setDuration(1);
    timer.setTickCallback(tickCB);
    timer.setCompletionCallback(completionCB);
    timer.start();

    setTimeout( () => {
      try {
        expect(tickCB).to.be.called;
        expect(completionCB).to.be.called;

        expect(timer._running).to.be.false;
        expect(timer._timer).to.be.null;

        expect(timer.timeRemaining).to.equal(0);
        done();
      }
      catch(err) {
        done(err);
      }
    }, 1100 );
  });
});
