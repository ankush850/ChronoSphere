/* Precision Stopwatch Module with Laps */
import { Sound } from '../sound.js';

export class StopwatchManager {
  constructor() {
    this.hoursEl = document.getElementById('swHours');
    this.minutesEl = document.getElementById('swMinutes');
    this.secondsEl = document.getElementById('swSeconds');
    this.millisEl = document.getElementById('swMillis');

    this.startBtn = document.getElementById('swStartBtn');
    this.lapBtn = document.getElementById('swLapBtn');
    this.resetBtn = document.getElementById('swResetBtn');

    this.lapsContainer = document.getElementById('lapsContainer');
    this.lapsTableBody = document.getElementById('lapsTableBody');
    this.totalLapsCount = document.getElementById('totalLapsCount');

    this.startTime = 0;
    this.elapsedTime = 0;
    this.timerRaf = null;
    this.isRunning = false;
    this.laps = [];
    this.lastLapTime = 0;

    this.init();
  }

  init() {
    this.startBtn.addEventListener('click', () => this.toggle());
    this.lapBtn.addEventListener('click', () => this.recordLap());
    this.resetBtn.addEventListener('click', () => this.reset());
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
    this.isRunning = true;
    this.startTime = performance.now() - this.elapsedTime;
    this.startBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
      <span>Pause</span>
    `;
    this.lapBtn.disabled = false;
    this.resetBtn.disabled = false;

    const tick = () => {
      this.elapsedTime = performance.now() - this.startTime;
      this.updateDisplay(this.elapsedTime);
      this.timerRaf = requestAnimationFrame(tick);
    };
    this.timerRaf = requestAnimationFrame(tick);
  }

  pause() {
    this.isRunning = false;
    cancelAnimationFrame(this.timerRaf);
    this.startBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
      <span>Resume</span>
    `;
  }

  reset() {
    Sound.playClick();
    this.pause();
    this.elapsedTime = 0;
    this.lastLapTime = 0;
    this.laps = [];
    this.updateDisplay(0);
    this.startBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
      <span>Start</span>
    `;
    this.lapBtn.disabled = true;
    this.resetBtn.disabled = true;
    this.lapsContainer.classList.add('hidden');
    this.lapsTableBody.innerHTML = '';
  }

  recordLap() {
    if (!this.isRunning) return;
    Sound.playBeep(1200, 0.08);

    const currentElapsed = this.elapsedTime;
    const splitTime = currentElapsed - this.lastLapTime;
    this.lastLapTime = currentElapsed;

    this.laps.unshift({
      number: this.laps.length + 1,
      split: splitTime,
      total: currentElapsed
    });

    this.renderLaps();
  }

  formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const millis = Math.floor((ms % 1000) / 10);

    return {
      h: String(hours).padStart(2, '0'),
      m: String(minutes).padStart(2, '0'),
      s: String(seconds).padStart(2, '0'),
      ms: String(millis).padStart(2, '0')
    };
  }

  updateDisplay(ms) {
    const formatted = this.formatTime(ms);
    this.hoursEl.textContent = formatted.h;
    this.minutesEl.textContent = formatted.m;
    this.secondsEl.textContent = formatted.s;
    this.millisEl.textContent = formatted.ms;
  }

  renderLaps() {
    this.lapsContainer.classList.remove('hidden');
    this.totalLapsCount.textContent = `${this.laps.length} Laps`;
    this.lapsTableBody.innerHTML = '';

    let minSplit = Infinity;
    let maxSplit = -Infinity;
    if (this.laps.length > 1) {
      this.laps.forEach(lap => {
        if (lap.split < minSplit) minSplit = lap.split;
        if (lap.split > maxSplit) maxSplit = lap.split;
      });
    }

    this.laps.forEach(lap => {
      const splitFormatted = this.formatTime(lap.split);
      const totalFormatted = this.formatTime(lap.total);

      let deltaClass = '';
      let deltaBadge = '-';
      if (this.laps.length > 1) {
        if (lap.split === minSplit) {
          deltaClass = 'lap-fastest';
          deltaBadge = '⚡ Fastest';
        } else if (lap.split === maxSplit) {
          deltaClass = 'lap-slowest';
          deltaBadge = '🐢 Slowest';
        }
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>#${lap.number}</strong></td>
        <td class="${deltaClass}">+${splitFormatted.m}:${splitFormatted.s}.${splitFormatted.ms}</td>
        <td>${totalFormatted.h}:${totalFormatted.m}:${totalFormatted.s}.${totalFormatted.ms}</td>
        <td class="${deltaClass}">${deltaBadge}</td>
      `;
      this.lapsTableBody.appendChild(tr);
    });
  }
}
