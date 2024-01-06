/* Ambient Sound Generator (Web Audio API) */
import { State } from '../state.js';

export class AmbienceManager {
  constructor() {
    this.selectEl = document.getElementById('ambientSelect');
    this.volSlider = document.getElementById('ambientVolume');
    this.toggleBtn = document.getElementById('ambientToggleBtn');
    this.iconPlay = document.getElementById('ambientIconPlay');
    this.iconPause = document.getElementById('ambientIconPause');

    this.audioCtx = null;
    this.noiseNode = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.currentType = 'rain';

    this.init();
  }

  init() {
    if (!this.toggleBtn) return;

    this.toggleBtn.addEventListener('click', () => this.toggle());
    this.selectEl.addEventListener('change', (e) => {
      this.currentType = e.target.value;
      if (this.isPlaying) {
        this.stop();
        this.start();
      }
    });

    this.volSlider.addEventListener('input', (e) => {
      const vol = parseFloat(e.target.value);
      if (this.gainNode) {
        this.gainNode.gain.setValueAtTime(vol, this.audioCtx.currentTime);
      }
    });
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  start() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!this.audioCtx) this.audioCtx = new AudioContext();
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

      const bufferSize = 2 * this.audioCtx.sampleRate;
      const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        if (this.currentType === 'rain') {
          // Pink / Brownish rain noise filter
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
        } else if (this.currentType === 'waves') {
          // Ocean waves modulation
          const white = Math.random() * 2 - 1;
          const cycle = Math.sin(i / 15000);
          output[i] = white * (0.3 + 0.7 * cycle);
        } else if (this.currentType === 'binaural') {
          // 432Hz Focus tone generator
          output[i] = Math.sin(2 * Math.PI * 432 * (i / this.audioCtx.sampleRate));
        } else {
          output[i] = Math.random() * 2 - 1;
        }
      }

      this.noiseNode = this.audioCtx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      this.gainNode = this.audioCtx.createGain();
      const vol = parseFloat(this.volSlider.value);
      this.gainNode.gain.setValueAtTime(vol, this.audioCtx.currentTime);

      this.noiseNode.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);
      this.noiseNode.start();

      this.isPlaying = true;
      this.iconPlay.classList.add('hidden');
      this.iconPause.classList.remove('hidden');
    } catch (e) {
      console.warn('Ambient Audio error:', e);
    }
  }

  stop() {
    if (this.noiseNode) {
      this.noiseNode.stop();
      this.noiseNode.disconnect();
      this.noiseNode = null;
    }
    this.isPlaying = false;
    this.iconPlay.classList.remove('hidden');
    this.iconPause.classList.add('hidden');
  }
}
