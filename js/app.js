/* ChronoSphere — Main Application Entrypoint */
import { State, STORAGE_KEYS, saveStorage } from './state.js';
import { Sound } from './sound.js';
import { ClockManager } from './modules/clock.js';
import { WorldClockManager } from './modules/world.js';
import { StopwatchManager } from './modules/stopwatch.js';
import { TimerManager } from './modules/timer.js';
import { Alarm } from './modules/alarm.js';
import { PomodoroManager } from './modules/pomodoro.js';
import { WeatherManager } from './modules/weather.js';
import { AmbienceManager } from './modules/ambience.js';
import { EventsManager } from './modules/events.js';
import { AnalyticsManager } from './modules/analytics.js';
import { ChimeManager } from './modules/chime.js';
import { CustomThemeManager } from './modules/customTheme.js';

export class AppController {
  constructor(instances) {
    this.instances = instances;

    this.themeBtn = document.getElementById('themeMenuBtn');
    this.themeDropdown = document.getElementById('themeDropdown');
    this.themeOptions = document.querySelectorAll('.theme-option');
    this.formatToggleBtn = document.getElementById('formatToggleBtn');
    this.soundToggleBtn = document.getElementById('soundToggleBtn');
    this.soundIconOn = document.getElementById('soundIconOn');
    this.soundIconOff = document.getElementById('soundIconOff');
    this.fullscreenBtn = document.getElementById('fullscreenBtn');
    this.navTabs = document.querySelectorAll('.nav-tab');
    this.tabPanes = document.querySelectorAll('.tab-pane');

    this.init();
  }

  init() {
    this.setTheme(State.theme);

    this.themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.themeDropdown.classList.toggle('hidden');
      Sound.playClick();
    });

    document.addEventListener('click', (e) => {
      if (!this.themeDropdown.contains(e.target) && e.target !== this.themeBtn) {
        this.themeDropdown.classList.add('hidden');
      }
    });

    this.themeOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const theme = opt.getAttribute('data-theme');
        if (theme) {
          this.setTheme(theme);
          this.themeDropdown.classList.add('hidden');
          Sound.playClick();
        }
      });
    });

    this.updateFormatButton();
    this.formatToggleBtn.addEventListener('click', () => {
      State.is24Hour = !State.is24Hour;
      saveStorage(STORAGE_KEYS.FORMAT_24H, State.is24Hour);
      this.updateFormatButton();
      this.instances.clock.updateTime();
      this.instances.world.render();
      Alarm.render();
      Sound.playClick();
    });

    this.updateSoundIcons();
    this.soundToggleBtn.addEventListener('click', () => {
      State.soundEnabled = !State.soundEnabled;
      saveStorage(STORAGE_KEYS.SOUND_ENABLED, State.soundEnabled);
      this.updateSoundIcons();
      if (State.soundEnabled) Sound.playClick();
    });

    this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

    this.navTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        this.switchTab(tabId);
        Sound.playClick();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (State.activeTab === 'stopwatch') this.instances.stopwatch.toggle();
        if (State.activeTab === 'timer') this.instances.timer.toggle();
        if (State.activeTab === 'pomodoro') this.instances.pomodoro.toggle();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        this.toggleFullscreen();
      } else if (['1', '2', '3', '4', '5', '6', '7'].includes(e.key)) {
        const tabNames = ['clock', 'world', 'stopwatch', 'timer', 'alarm', 'pomodoro', 'events'];
        const selectedTab = tabNames[parseInt(e.key, 10) - 1];
        if (selectedTab) this.switchTab(selectedTab);
      } else if (e.key === 'Escape') {
        document.getElementById('cityModal')?.classList.add('hidden');
        document.getElementById('alarmModal')?.classList.add('hidden');
        document.getElementById('eventModal')?.classList.add('hidden');
        document.getElementById('customThemeModal')?.classList.add('hidden');
        this.themeDropdown.classList.add('hidden');
      }
    });
  }

  setTheme(theme) {
    State.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    saveStorage(STORAGE_KEYS.THEME, theme);

    this.themeOptions.forEach(opt => {
      opt.classList.toggle('active', opt.getAttribute('data-theme') === theme);
    });
  }

  updateFormatButton() {
    this.formatToggleBtn.classList.toggle('active-24h', State.is24Hour);
  }

  updateSoundIcons() {
    this.soundIconOn.classList.toggle('hidden', !State.soundEnabled);
    this.soundIconOff.classList.toggle('hidden', State.soundEnabled);
  }

  toggleFullscreen() {
    Sound.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn('Fullscreen error:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  switchTab(tabId) {
    State.activeTab = tabId;
    this.navTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-tab') === tabId));
    this.tabPanes.forEach(pane => {
      pane.classList.toggle('active', pane.id === `tab-${tabId}`);
    });
  }
}

// Global App Auto-Init
document.addEventListener('DOMContentLoaded', () => {
  const clock = new ClockManager();
  const world = new WorldClockManager();
  const stopwatch = new StopwatchManager();
  const timer = new TimerManager();
  const pomodoro = new PomodoroManager();
  const weather = new WeatherManager();
  const ambience = new AmbienceManager();
  const events = new EventsManager();
  const analytics = new AnalyticsManager();
  const chime = new ChimeManager();
  const customTheme = new CustomThemeManager();
  
  window.ChronoSphere = new AppController({
    clock, world, stopwatch, timer, pomodoro, weather, ambience, events, analytics, chime, customTheme, alarm: Alarm
  });
});
