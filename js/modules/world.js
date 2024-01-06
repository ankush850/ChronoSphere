/* World Clock Module */
import { State, STORAGE_KEYS, saveStorage } from '../state.js';
import { Sound } from '../sound.js';

export class WorldClockManager {
  constructor() {
    this.grid = document.getElementById('worldClockGrid');
    this.addCityBtn = document.getElementById('addCityBtn');
    this.modal = document.getElementById('cityModal');
    this.closeModalBtn = document.getElementById('closeCityModalBtn');
    this.cancelBtn = document.getElementById('cancelCityBtn');
    this.confirmBtn = document.getElementById('confirmCityBtn');
    this.citySelect = document.getElementById('citySelect');

    this.cityMetadata = {
      'America/New_York': { name: 'New York', country: 'USA' },
      'America/Los_Angeles': { name: 'Los Angeles', country: 'USA' },
      'America/Chicago': { name: 'Chicago', country: 'USA' },
      'Europe/London': { name: 'London', country: 'United Kingdom' },
      'Europe/Paris': { name: 'Paris', country: 'France' },
      'Europe/Berlin': { name: 'Berlin', country: 'Germany' },
      'Asia/Tokyo': { name: 'Tokyo', country: 'Japan' },
      'Asia/Dubai': { name: 'Dubai', country: 'UAE' },
      'Asia/Singapore': { name: 'Singapore', country: 'Singapore' },
      'Asia/Kolkata': { name: 'New Delhi / Mumbai', country: 'India' },
      'Asia/Hong_Kong': { name: 'Hong Kong', country: 'Hong Kong' },
      'Asia/Shanghai': { name: 'Shanghai', country: 'China' },
      'Australia/Sydney': { name: 'Sydney', country: 'Australia' },
      'Pacific/Auckland': { name: 'Auckland', country: 'New Zealand' }
    };

    this.init();
  }

  init() {
    this.render();
    setInterval(() => this.render(), 1000);

    this.addCityBtn.addEventListener('click', () => {
      this.modal.classList.remove('hidden');
      Sound.playClick();
    });

    const closeModal = () => {
      this.modal.classList.add('hidden');
      Sound.playClick();
    };

    this.closeModalBtn.addEventListener('click', closeModal);
    this.cancelBtn.addEventListener('click', closeModal);

    this.confirmBtn.addEventListener('click', () => {
      const selectedTz = this.citySelect.value;
      const meta = this.cityMetadata[selectedTz] || { name: selectedTz.split('/').pop().replace('_', ' '), country: 'Global' };

      if (!State.worldCities.some(c => c.timezone === selectedTz)) {
        State.worldCities.push({
          name: meta.name,
          timezone: selectedTz,
          country: meta.country
        });
        saveStorage(STORAGE_KEYS.WORLD_CITIES, State.worldCities);
        this.render();
      }
      closeModal();
    });
  }

  removeCity(index) {
    State.worldCities.splice(index, 1);
    saveStorage(STORAGE_KEYS.WORLD_CITIES, State.worldCities);
    this.render();
    Sound.playClick();
  }

  getTimeForZone(timezone) {
    const now = new Date();
    try {
      const options = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !State.is24Hour
      };
      const formatter = new Intl.DateTimeFormat([], options);
      const parts = formatter.formatToParts(now);
      
      let hour = '', minute = '', second = '', dayPeriod = '';
      parts.forEach(p => {
        if (p.type === 'hour') hour = p.value;
        if (p.type === 'minute') minute = p.value;
        if (p.type === 'second') second = p.value;
        if (p.type === 'dayPeriod') dayPeriod = p.value.toUpperCase();
      });

      const dateOpts = { timeZone: timezone, weekday: 'short', month: 'short', day: 'numeric' };
      const dateStr = new Intl.DateTimeFormat([], dateOpts).format(now);

      const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
      const diffHours = Math.round(((tzDate - new Date(now.toLocaleString('en-US'))) / 3600000) * 10) / 10;
      const diffStr = diffHours === 0 ? 'Same time' : (diffHours > 0 ? `+${diffHours} hrs` : `${diffHours} hrs`);

      return {
        timeStr: `${hour}:${minute}:${second}${dayPeriod ? ' ' + dayPeriod : ''}`,
        dateStr,
        diffStr
      };
    } catch (e) {
      return { timeStr: '--:--:--', dateStr: 'Invalid Timezone', diffStr: '' };
    }
  }

  render() {
    if (!this.grid) return;
    this.grid.innerHTML = '';

    State.worldCities.forEach((city, index) => {
      const data = this.getTimeForZone(city.timezone);

      const card = document.createElement('div');
      card.className = 'world-card glass-card';
      card.innerHTML = `
        <div class="world-card-top">
          <div>
            <h3 class="world-city-name">${city.name}</h3>
            <p class="world-country-name">${city.country}</p>
          </div>
          <button class="world-delete-btn" title="Remove City" data-index="${index}">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="world-time-val">${data.timeStr}</div>
        <div class="world-card-bottom">
          <span>${data.dateStr}</span>
          <span class="world-offset-badge">${data.diffStr}</span>
        </div>
      `;

      card.querySelector('.world-delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.removeCity(index);
      });

      this.grid.appendChild(card);
    });
  }
}
