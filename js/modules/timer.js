/* Countdown Timer Module */
import { Sound } from '../sound.js';

export class TimerManager {
  constructor() {
    this.display = document.getElementById('timerDisplay');
    this.statusLabel = document.getElementById('timerStatusLabel');
    this.startBtn = document.getElementById('timerStartBtn');
    this.plusOneBtn = document.getElementById('timerPlusOneBtn');
    this.resetBtn = document.getElementById('timerResetBtn');
    this.progressRing = document.getElementById('timerProgressRing');

    this.presetButtons = document.querySelectorAll('.preset-pill');
    this.customHoursInput = document.getElementById('customHours');
    this.customMinutesInput = document.getElementById('customMinutes');
    this.customSecondsInput = document.getElementById('customSeconds');
    this.setCustomBtn = document.getElementById('setCustomTimerBtn');

    this.totalSeconds = 300;
    this.remainingSeconds = 300;
    this.timerInterval = null;
    this.isRunning = false;

    this.circumference = 2 * Math.PI * 120;
    this.progressRing.style.strokeDasharray = `${this.circumference} ${this.circumference}`;

    this.init();
  }

  init() {
    this.updateDisplay();

    this.startBtn.addEventListener('click', () => this.toggle());
    this.plusOneBtn.addEventListener('click', () => this.addOneMinute());
    this.resetBtn.addEventListener('click', () => this.reset());

    this.presetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        Sound.playClick();
        const secs = parseInt(btn.getAttribute('data-seconds'), 10);
        this.setTimer(secs);
      });
    });

    this.setCustomBtn.addEventListener('click', () => {
      Sound.playClick();
      const h = parseInt(this.customHoursInput.value, 10) || 0;
      const m = parseInt(this.customMinutesInput.value, 10) || 0;
      const s = parseInt(this.customSecondsInput.value, 10) || 0;
      const total = h * 3600 + m * 60 + s;
      if (total > 0) {
        this.setTimer(total);
      }
    });
  }

  setTimer(seconds) {
    this.pause();
    this.totalSeconds = seconds;
    this.remainingSeconds = seconds;
    this.statusLabel.textContent = 'Ready';
    this.updateDisplay();
    this.startBtn.disabled = false;
    this.resetBtn.disabled = false;
    this.plusOneBtn.disabled = false;
  }

  toggle() {
    Sound.playClick();
    if (this.isRunning) {
      this.pause();
    } else {
      this.start();
    }
  }

  start() {
    if (this.remainingSeconds <= 0) return;
    this.isRunning = true;
    this.statusLabel.textContent = 'Counting Down';
    this.startBtn.textContent = 'Pause';
    this.plusOneBtn.disabled = false;
    this.resetBtn.disabled = false;

    this.timerInterval = setInterval(() => {
      this.remainingSeconds--;
      this.updateDisplay();

      if (this.remainingSeconds <= 0) {
        this.complete();
      }
    }, 1000);
  }

  pause() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    this.startBtn.textContent = 'Resume';
    if (this.remainingSeconds > 0) {
      this.statusLabel.textContent = 'Paused';
    }
  }

  reset() {
    Sound.playClick();
    this.pause();
    this.remainingSeconds = this.totalSeconds;
    this.startBtn.textContent = 'Start';
    this.statusLabel.textContent = 'Ready';
    this.updateDisplay();
  }

  addOneMinute() {
    Sound.playClick();
    this.remainingSeconds += 60;
    this.totalSeconds += 60;
    this.updateDisplay();
  }

  complete() {
    this.pause();
    this.statusLabel.textContent = "Time's Up!";
    this.startBtn.textContent = 'Start';
    Sound.startAlarmTone('chime');
    
    this.display.style.color = '#ff0055';
    setTimeout(() => {
      this.display.style.color = '';
      Sound.stopAlarmTone();
    }, 5000);

    if (Notification.permission === 'granted') {
      new Notification('ChronoSphere Timer', {
        body: 'Countdown timer has completed!',
        icon: 'favicon.ico'
      });
    }
  }

  updateDisplay() {
    const hours = Math.floor(this.remainingSeconds / 3600);
    const minutes = Math.floor((this.remainingSeconds % 3600) / 60);
    const seconds = this.remainingSeconds % 60;

    const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    this.display.textContent = timeStr;

    const fraction = this.totalSeconds > 0 ? this.remainingSeconds / this.totalSeconds : 0;
    const offset = this.circumference - fraction * this.circumference;
    this.progressRing.style.strokeDashoffset = offset;
  }
}
