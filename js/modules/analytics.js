/* Productivity Analytics & Streak Tracker */
export class AnalyticsManager {
  constructor() {
    this.container = document.getElementById('analyticsDashboard');
    this.focusMinsEl = document.getElementById('statFocusMins');
    this.sessionsCountEl = document.getElementById('statSessionsCount');
    this.streakEl = document.getElementById('statStreak');

    this.stats = JSON.parse(localStorage.getItem('chronosphere_analytics') || JSON.stringify({
      focusMins: 125,
      completedSessions: 5,
      streakDays: 3,
      lastDate: new Date().toDateString()
    }));

    this.init();
  }

  init() {
    this.render();
  }

  addFocusMinutes(mins) {
    this.stats.focusMins += mins;
    this.stats.completedSessions += 1;
    localStorage.setItem('chronosphere_analytics', JSON.stringify(this.stats));
    this.render();
  }

  render() {
    if (!this.container) return;
    if (this.focusMinsEl) this.focusMinsEl.textContent = `${this.stats.focusMins} m`;
    if (this.sessionsCountEl) this.sessionsCountEl.textContent = `${this.stats.completedSessions}`;
    if (this.streakEl) this.streakEl.textContent = `${this.stats.streakDays} 🔥`;
  }
}
