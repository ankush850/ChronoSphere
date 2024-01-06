/* Web Audio API Synthesizer Engine */
import { State } from './state.js';

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.alarmOscillatorInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    if (!State.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  playBeep(freq = 880, duration = 0.15) {
    if (!State.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  startAlarmTone(type = 'chime') {
    if (!State.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    this.stopAlarmTone();

    const playPattern = () => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      if (type === 'pulse') {
        [0, 0.12, 0.24, 0.36].forEach((delay) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(987.77, now + delay);
          gain.gain.setValueAtTime(0.2, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.08);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.08);
        });
      } else if (type === 'gentle') {
        [523.25, 659.25, 783.99].forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.2);
          gain.gain.setValueAtTime(0.2, now + i * 0.2);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.2 + 0.8);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.2);
          osc.stop(now + i * 0.2 + 0.8);
        });
      } else {
        const notes = [440, 554.37, 659.25, 880];
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.22, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.3);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.3);
        });
      }
    };

    playPattern();
    this.alarmOscillatorInterval = setInterval(playPattern, 1600);
  }

  stopAlarmTone() {
    if (this.alarmOscillatorInterval) {
      clearInterval(this.alarmOscillatorInterval);
      this.alarmOscillatorInterval = null;
    }
  }
}

export const Sound = new SoundEngine();
