/* Live Weather Module (Open-Meteo Free API) */
export class WeatherManager {
  constructor() {
    this.tempEl = document.getElementById('weatherTemp');
    this.iconEl = document.getElementById('weatherIcon');
    this.locEl = document.getElementById('weatherLoc');
    this.container = document.getElementById('weatherWidget');

    this.init();
  }

  async init() {
    if (!this.container) return;
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => this.fetchWeather(pos.coords.latitude, pos.coords.longitude),
          () => this.fetchWeather(28.6139, 77.2090, 'New Delhi') // Default fallback
        );
      } else {
        this.fetchWeather(28.6139, 77.2090, 'New Delhi');
      }
    } catch (e) {
      console.warn('Weather fetch failed:', e);
    }
  }

  async fetchWeather(lat, lon, locationName = 'Local') {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
      const res = await fetch(url);
      const data = await res.json();
      
      if (data && data.current_weather) {
        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;
        const icon = this.getWeatherIcon(code);

        this.tempEl.textContent = `${temp}°C`;
        this.iconEl.textContent = icon;
        this.locEl.textContent = locationName;
      }
    } catch (e) {
      this.tempEl.textContent = '24°C';
      this.iconEl.textContent = '☀️';
      this.locEl.textContent = 'Sunny';
    }
  }

  getWeatherIcon(code) {
    if (code === 0) return '☀️';
    if (code >= 1 && code <= 3) return '⛅';
    if (code >= 45 && code <= 48) return '🌫️';
    if (code >= 51 && code <= 67) return '🌧️';
    if (code >= 71 && code <= 77) return '❄️';
    if (code >= 80 && code <= 82) return '🌧️';
    if (code >= 95 && code <= 99) return '⛈️';
    return '🌤️';
  }
}
