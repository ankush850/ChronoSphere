/* LocalStorage & Global Application State */
export const STORAGE_KEYS = {
  THEME: 'chronosphere_theme',
  FORMAT_24H: 'chronosphere_is24h',
  SOUND_ENABLED: 'chronosphere_sound',
  WORLD_CITIES: 'chronosphere_cities',
  ALARMS: 'chronosphere_alarms',
  ANALOG_VISIBLE: 'chronosphere_analog'
};

export const State = {
  is24Hour: JSON.parse(localStorage.getItem(STORAGE_KEYS.FORMAT_24H) || 'false'),
  soundEnabled: JSON.parse(localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED) || 'true'),
  theme: localStorage.getItem(STORAGE_KEYS.THEME) || 'aurora',
  analogVisible: JSON.parse(localStorage.getItem(STORAGE_KEYS.ANALOG_VISIBLE) || 'false'),
  
  worldCities: JSON.parse(localStorage.getItem(STORAGE_KEYS.WORLD_CITIES) || JSON.stringify([
    { name: 'New York', timezone: 'America/New_York', country: 'USA' },
    { name: 'London', timezone: 'Europe/London', country: 'UK' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo', country: 'Japan' },
    { name: 'Dubai', timezone: 'Asia/Dubai', country: 'UAE' },
    { name: 'Sydney', timezone: 'Australia/Sydney', country: 'Australia' }
  ])),

  alarms: JSON.parse(localStorage.getItem(STORAGE_KEYS.ALARMS) || '[]'),
  activeAlarmTrigger: null,
  activeTab: 'clock'
};

export function saveStorage(key, value) {
  try {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  } catch (e) {
    console.error('LocalStorage error:', e);
  }
}
