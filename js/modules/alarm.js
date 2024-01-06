/* Alarm Clock Module */
import { State, STORAGE_KEYS, saveStorage } from '../state.js';
import { Sound } from '../sound.js';

class AlarmManager {
  constructor() {
    this.alarmList = document.getElementById('alarmList');
    this.noAlarmsPlaceholder = document.getElementById('noAlarmsPlaceholder');
    this.alarmBadge = document.getElementById('alarmBadge');
    this.openModalBtn = document.getElementById('openAddAlarmModalBtn');
    this.modal = document.getElementById('alarmModal');
    this.closeModalBtn = document.getElementById('closeAlarmModalBtn');
    this.cancelBtn = document.getElementById('cancelAlarmBtn');
    this.saveBtn = document.getElementById('saveAlarmBtn');

    this.alarmTimeInput = document.getElementById('alarmTimeInput');
    this.alarmLabelInput = document.getElementById('alarmLabelInput');
    this.alarmToneSelect = document.getElementById('alarmToneSelect');

    this.overlay = document.getElementById('alarmTriggerOverlay');
    this.ringingLabel = document.getElementById('ringingAlarmLabel');
    this.ringingTime = document.getElementById('ringingAlarmTime');
    this.snoozeBtn = document.getElementById('snoozeAlarmBtn');
    this.dismissBtn = document.getElementById('dismissAlarmBtn');

    this.init();
  }

  init() {
    this.render();

    this.openModalBtn.addEventListener('click', () => {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 10);
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      this.alarmTimeInput.value = `${hh}:${mm}`;
      this.alarmLabelInput.value = '';
      this.modal.classList.remove('hidden');
      Sound.playClick();
    });

    const closeModal = () => {
      this.modal.classList.add('hidden');
      Sound.playClick();
    };

    this.closeModalBtn.addEventListener('click', closeModal);
    this.cancelBtn.addEventListener('click', closeModal);

    this.saveBtn.addEventListener('click', () => {
      const timeVal = this.alarmTimeInput.value;
      if (!timeVal) return;

      const labelVal = this.alarmLabelInput.value.trim() || 'Standard Alarm';
      const toneVal = this.alarmToneSelect.value;

      State.alarms.push({
        id: Date.now(),
        time: timeVal,
        label: labelVal,
        tone: toneVal,
        enabled: true,
        lastTriggerDate: null
      });

      saveStorage(STORAGE_KEYS.ALARMS, State.alarms);
      this.render();
      closeModal();

      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
    });

    this.snoozeBtn.addEventListener('click', () => {
      this.dismissRinging(true);
    });

    this.dismissBtn.addEventListener('click', () => {
      this.dismissRinging(false);
    });
  }

  render() {
    if (!this.alarmList) return;
    this.alarmList.innerHTML = '';

    const activeCount = State.alarms.filter(a => a.enabled).length;
    if (activeCount > 0) {
      this.alarmBadge.textContent = activeCount;
      this.alarmBadge.classList.remove('hidden');
    } else {
      this.alarmBadge.classList.add('hidden');
    }

    if (State.alarms.length === 0) {
      this.noAlarmsPlaceholder.classList.remove('hidden');
      return;
    }

    this.noAlarmsPlaceholder.classList.add('hidden');

    State.alarms.forEach((alarm) => {
      const card = document.createElement('div');
      card.className = 'alarm-card glass-card';
      
      const [h, m] = alarm.time.split(':').map(Number);
      let timeFormatted = alarm.time;
      if (!State.is24Hour) {
        const period = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        timeFormatted = `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
      }

      card.innerHTML = `
        <div>
          <div class="alarm-time-tag">${timeFormatted}</div>
          <div class="alarm-label-tag">${alarm.label} • <span style="text-transform: capitalize;">${alarm.tone}</span></div>
        </div>
        <div class="alarm-right">
          <label class="switch">
            <input type="checkbox" class="alarm-toggle-checkbox" data-id="${alarm.id}" ${alarm.enabled ? 'checked' : ''}>
            <span class="slider"></span>
          </label>
          <button class="alarm-delete-btn" data-id="${alarm.id}" title="Delete Alarm">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      `;

      card.querySelector('.alarm-toggle-checkbox').addEventListener('change', (e) => {
        alarm.enabled = e.target.checked;
        saveStorage(STORAGE_KEYS.ALARMS, State.alarms);
        this.render();
        Sound.playClick();
      });

      card.querySelector('.alarm-delete-btn').addEventListener('click', () => {
        State.alarms = State.alarms.filter(a => a.id !== alarm.id);
        saveStorage(STORAGE_KEYS.ALARMS, State.alarms);
        this.render();
        Sound.playClick();
      });

      this.alarmList.appendChild(card);
    });
  }

  checkAlarmTrigger(now) {
    if (this.overlay && !this.overlay.classList.contains('hidden')) return;

    const currentHH = String(now.getHours()).padStart(2, '0');
    const currentMM = String(now.getMinutes()).padStart(2, '0');
    const currentTimeStr = `${currentHH}:${currentMM}`;
    const todayDateStr = now.toDateString();

    State.alarms.forEach(alarm => {
      if (alarm.enabled && alarm.time === currentTimeStr && alarm.lastTriggerDate !== todayDateStr) {
        alarm.lastTriggerDate = todayDateStr;
        saveStorage(STORAGE_KEYS.ALARMS, State.alarms);
        this.triggerAlarm(alarm);
      }
    });
  }

  triggerAlarm(alarm) {
    State.activeAlarmTrigger = alarm;
    this.ringingLabel.textContent = alarm.label;
    this.ringingTime.textContent = alarm.time;
    this.overlay.classList.remove('hidden');

    Sound.startAlarmTone(alarm.tone || 'chime');

    if ('vibrate' in navigator) {
      navigator.vibrate([500, 250, 500, 250, 500]);
    }

    if (Notification.permission === 'granted') {
      new Notification(`Alarm: ${alarm.label}`, {
        body: `It is currently ${alarm.time}.`,
        icon: 'favicon.ico'
      });
    }
  }

  dismissRinging(isSnooze = false) {
    Sound.stopAlarmTone();
    this.overlay.classList.add('hidden');

    if (isSnooze && State.activeAlarmTrigger) {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 5);
      const snoozeHH = String(now.getHours()).padStart(2, '0');
      const snoozeMM = String(now.getMinutes()).padStart(2, '0');
      
      State.alarms.push({
        id: Date.now(),
        time: `${snoozeHH}:${snoozeMM}`,
        label: `(Snooze) ${State.activeAlarmTrigger.label}`,
        tone: State.activeAlarmTrigger.tone,
        enabled: true,
        lastTriggerDate: null
      });
      saveStorage(STORAGE_KEYS.ALARMS, State.alarms);
      this.render();
    }

    State.activeAlarmTrigger = null;
    Sound.playClick();
  }
}

export const Alarm = new AlarmManager();
