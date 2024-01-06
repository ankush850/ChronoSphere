/* Hourly Chime & Speech Time Announcement */
import { Sound } from '../sound.js';
import { State } from '../state.js';

export class ChimeManager {
  constructor() {
    this.enabled = JSON.parse(localStorage.getItem('chronosphere_chime') || 'true');
    this.voiceEnabled = JSON.parse(localStorage.getItem('chronosphere_voice') || 'false');
    this.lastChimeHour = -1;

    this.init();
  }

  init() {
    setInterval(() => this.checkHourlyChime(), 1000);
  }

  checkHourlyChime() {
    if (!this.enabled) return;
    const now = new Date();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    const hour = now.getHours();

    if (min === 0 && sec === 0 && hour !== this.lastChimeHour) {
      this.lastChimeHour = hour;
      this.playChime(hour);
    }
  }

  playChime(hour) {
    Sound.playBeep(523.25, 0.4); // C5 tone
    setTimeout(() => Sound.playBeep(659.25, 0.6), 400); // E5 tone

    if (this.voiceEnabled && 'speechSynthesis' in window) {
      const h12 = hour % 12 || 12;
      const period = hour >= 12 ? 'PM' : 'AM';
      const speech = new SpeechSynthesisUtterance(`It is ${h12} ${period}`);
      speech.rate = 0.9;
      window.speechSynthesis.speak(speech);
    }
  }
}
