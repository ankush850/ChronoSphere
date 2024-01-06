/* Pomodoro Focus Timer Module */
import { Sound } from '../sound.js';

export class PomodoroManager {
  constructor() {
    this.digits = document.getElementById('pomodoroTime');
    this.caption = document.getElementById('pomodoroModeTitle');
    this.sessionCount = document.getElementById('pomoSessionCount');
    this.modeButtons = document.querySelectorAll('.pomo-mode-btn');
    this.dots = document.querySelectorAll('.cycle-dot');

    this.startBtn = document.getElementById('pomoStartBtn');
    this.skipBtn = document.getElementById('pomoSkipBtn');
    this.resetBtn = document.getElementById('pomoResetBtn');

    this.modes = {
      focus: { name: 'Focus', seconds: 25 * 60, caption: 'Time to Focus & Create' },
      short: { name: 'Short Break', seconds: 5 * 60, caption: 'Rest your eyes & stretch' },
      long: { name: 'Long Break', seconds: 15 * 60, caption: 'Recharge with coffee & fresh air' }
    };

    this.currentMode = 'focus';
    this.remainingSeconds = this.modes.focus.seconds;
    this.currentCycle = 1;
    this.isRunning = false;
    this.interval = null;

    this.init();
  }

  init() {
    this.updateDisplay();

    this.modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-pomo');
        this.switchMode(mode);
        Sound.playClick();
      });
    });

    this.startBtn.addEventListener('click', () => this.toggle());
    this.skipBtn.addEventListener('click', () => this.skip());
    this.resetBtn.addEventListener('click', () => this.reset());
  }

  switchMode(mode) {
    this.pause();
    this.currentMode = mode;
    this.remainingSeconds = this.modes[mode].seconds;
    this.caption.textContent = this.modes[mode].caption;

    this.modeButtons.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-pomo') === mode);
    });

    this.updateDisplay();
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
    this.startBtn.textContent = 'Pause';

    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateDisplay();

      if (this.remainingSeconds <= 0) {
        this.completePhase();
      }
    }, 1000);
  }

  pause() {
    this.isRunning = false;
    clearInterval(this.interval);
    this.startBtn.textContent = this.currentMode === 'focus' ? 'Start Focus' : 'Start Break';
  }

  reset() {
    Sound.playClick();
    this.switchMode(this.currentMode);
  }

  skip() {
    Sound.playClick();
    this.completePhase();
  }

  completePhase() {
    this.pause();
    Sound.startAlarmTone('gentle');
    setTimeout(() => Sound.stopAlarmTone(), 3500);

    if (this.currentMode === 'focus') {
      if (this.currentCycle >= 4) {
        this.currentCycle = 1;
        this.switchMode('long');
      } else {
        this.currentCycle++;
        this.switchMode('short');
      }
    } else {
      this.switchMode('focus');
    }

    this.updateCycleDots();
  }

  updateCycleDots() {
    this.sessionCount.textContent = `Session ${this.currentCycle} / 4`;
    this.dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx < this.currentCycle);
    });
  }

  updateDisplay() {
    const mins = Math.floor(this.remainingSeconds / 60);
    const secs = this.remainingSeconds % 60;
    this.digits.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
}
