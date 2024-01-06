/* Event Countdown Tracker Module */
import { STORAGE_KEYS, saveStorage } from '../state.js';
import { Sound } from '../sound.js';

export class EventsManager {
  constructor() {
    this.grid = document.getElementById('eventsGrid');
    this.addBtn = document.getElementById('addEventBtn');
    this.modal = document.getElementById('eventModal');
    this.closeBtn = document.getElementById('closeEventModalBtn');
    this.cancelBtn = document.getElementById('cancelEventBtn');
    this.saveBtn = document.getElementById('saveEventBtn');

    this.titleInput = document.getElementById('eventTitleInput');
    this.dateInput = document.getElementById('eventDateInput');

    this.events = JSON.parse(localStorage.getItem('chronosphere_events') || JSON.stringify([
      { id: 1, title: 'New Year 2027', date: '2027-01-01T00:00:00' },
      { id: 2, title: 'Project Release', date: '2026-12-31T18:00:00' }
    ]));

    this.init();
  }

  init() {
    this.render();
    setInterval(() => this.render(), 1000);

    if (!this.addBtn) return;

    this.addBtn.addEventListener('click', () => {
      this.modal.classList.remove('hidden');
      Sound.playClick();
    });

    const closeModal = () => {
      this.modal.classList.add('hidden');
      Sound.playClick();
    };

    this.closeBtn.addEventListener('click', closeModal);
    this.cancelBtn.addEventListener('click', closeModal);

    this.saveBtn.addEventListener('click', () => {
      const title = this.titleInput.value.trim();
      const dateVal = this.dateInput.value;
      if (!title || !dateVal) return;

      this.events.push({
        id: Date.now(),
        title,
        date: dateVal
      });

      localStorage.setItem('chronosphere_events', JSON.stringify(this.events));
      this.render();
      closeModal();
    });
  }

  deleteEvent(id) {
    this.events = this.events.filter(e => e.id !== id);
    localStorage.setItem('chronosphere_events', JSON.stringify(this.events));
    this.render();
    Sound.playClick();
  }

  render() {
    if (!this.grid) return;
    this.grid.innerHTML = '';

    const now = new Date().getTime();

    this.events.forEach(item => {
      const targetTime = new Date(item.date).getTime();
      const diff = targetTime - now;

      let days = 0, hours = 0, mins = 0, secs = 0;
      if (diff > 0) {
        days = Math.floor(diff / (1000 * 60 * 60 * 24));
        hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        secs = Math.floor((diff % (1000 * 60)) / 1000);
      }

      const card = document.createElement('div');
      card.className = 'event-card glass-card';
      card.innerHTML = `
        <div class="pane-header" style="margin-bottom:0;">
          <div>
            <h3 class="event-title">${item.title}</h3>
            <span class="event-date-tag">${new Date(item.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <button class="world-delete-btn ev-delete-btn" title="Delete Event">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="event-countdown-boxes">
          <div class="ev-box"><span class="ev-num">${days}</span><span class="ev-unit">Days</span></div>
          <div class="ev-box"><span class="ev-num">${String(hours).padStart(2, '0')}</span><span class="ev-unit">Hrs</span></div>
          <div class="ev-box"><span class="ev-num">${String(mins).padStart(2, '0')}</span><span class="ev-unit">Mins</span></div>
          <div class="ev-box"><span class="ev-num">${String(secs).padStart(2, '0')}</span><span class="ev-unit">Secs</span></div>
        </div>
      `;

      card.querySelector('.ev-delete-btn').addEventListener('click', () => this.deleteEvent(item.id));
      this.grid.appendChild(card);
    });
  }
}
