/* Master Digital & Analog Clock Module */
import { State, STORAGE_KEYS, saveStorage } from '../state.js';
import { Sound } from '../sound.js';
import { Alarm } from './alarm.js';

export class ClockManager {
  constructor() {
    this.hoursEl = document.getElementById('hours');
    this.minutesEl = document.getElementById('minutes');
    this.secondsEl = document.getElementById('seconds');
    this.ampmEl = document.getElementById('ampmBadge');
    this.ampmContainer = document.getElementById('ampmContainer');
    this.progressBar = document.getElementById('secondsProgressBar');
    this.fullDateEl = document.getElementById('fullDateDisplay');
    this.weekOfYearEl = document.getElementById('weekOfYearDisplay');
    this.dayOfYearEl = document.getElementById('dayOfYearDisplay');
    this.greetingEl = document.getElementById('greetingText');
    this.timezoneBadge = document.getElementById('timezoneBadge');

    this.analogWrapper = document.getElementById('analogClockWrapper');
    this.toggleAnalogBtn = document.getElementById('toggleAnalogBtn');
    this.analogBtnText = document.getElementById('analogBtnText');
    this.hourHand = document.getElementById('analogHourHand');
    this.minuteHand = document.getElementById('analogMinuteHand');
    this.secondHand = document.getElementById('analogSecondHand');

    this.init();
  }

  init() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);

    if (State.analogVisible) {
      this.analogWrapper.classList.remove('hidden');
      this.analogBtnText.textContent = 'Hide Analog Dial';
    }

    this.toggleAnalogBtn.addEventListener('click', () => {
      State.analogVisible = !State.analogVisible;
      saveStorage(STORAGE_KEYS.ANALOG_VISIBLE, State.analogVisible);
      this.analogWrapper.classList.toggle('hidden', !State.analogVisible);
      this.analogBtnText.textContent = State.analogVisible ? 'Hide Analog Dial' : 'Show Analog Dial';
      Sound.playClick();
    });
  }

  updateTime() {
    const now = new Date();
    let rawHours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const isPM = rawHours >= 12;

    if (rawHours >= 5 && rawHours < 12) {
      this.greetingEl.textContent = 'Good Morning';
    } else if (rawHours >= 12 && rawHours < 17) {
      this.greetingEl.textContent = 'Good Afternoon';
    } else if (rawHours >= 17 && rawHours < 22) {
      this.greetingEl.textContent = 'Good Evening';
    } else {
      this.greetingEl.textContent = 'Good Night';
    }

    let displayHours = rawHours;
    if (!State.is24Hour) {
      displayHours = displayHours % 12;
      displayHours = displayHours ? displayHours : 12;
      this.ampmContainer.classList.remove('hidden');
      this.ampmEl.textContent = isPM ? 'PM' : 'AM';
    } else {
      this.ampmContainer.classList.add('hidden');
    }

    this.hoursEl.textContent = String(displayHours).padStart(2, '0');
    this.minutesEl.textContent = String(minutes).padStart(2, '0');
    this.secondsEl.textContent = String(seconds).padStart(2, '0');

    const progressPercent = ((seconds + 1) / 60) * 100;
    this.progressBar.style.width = `${progressPercent}%`;

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.fullDateEl.textContent = now.toLocaleDateString(undefined, dateOptions);

    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000)) + 1;
    const isLeapYear = (now.getFullYear() % 4 === 0 && now.getFullYear() % 100 !== 0) || (now.getFullYear() % 400 === 0);
    const totalDaysInYear = isLeapYear ? 366 : 365;
    const weekNumber = Math.ceil((dayOfYear + startOfYear.getDay()) / 7);

    this.dayOfYearEl.textContent = `Day ${dayOfYear} / ${totalDaysInYear}`;
    this.weekOfYearEl.textContent = `Week ${weekNumber}`;

    try {
      const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const offsetMin = -now.getTimezoneOffset();
      const offsetSign = offsetMin >= 0 ? '+' : '-';
      const offsetH = String(Math.floor(Math.abs(offsetMin) / 60)).padStart(2, '0');
      const offsetM = String(Math.abs(offsetMin) % 60).padStart(2, '0');
      this.timezoneBadge.textContent = `${tzName} (UTC${offsetSign}${offsetH}:${offsetM})`;
    } catch (e) {
      this.timezoneBadge.textContent = 'Local Time';
    }

    if (State.analogVisible) {
      const secDeg = (seconds / 60) * 360;
      const minDeg = ((minutes + seconds / 60) / 60) * 360;
      const hourDeg = (((rawHours % 12) + minutes / 60) / 12) * 360;

      this.secondHand.style.transform = `rotate(${secDeg}deg)`;
      this.minuteHand.style.transform = `rotate(${minDeg}deg)`;
      this.hourHand.style.transform = `rotate(${hourDeg}deg)`;
    }

    if (Alarm && typeof Alarm.checkAlarmTrigger === 'function') {
      Alarm.checkAlarmTrigger(now);
    }
  }
}
