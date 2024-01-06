# Feature: Master Digital Clock & Quartz Analog Dial

The Master Clock is ChronoSphere's central time readout view.

---

## ⚙️ How It Works

1. **Digital Readout**: Updates every 1000ms using native `Date` object getters (`getHours()`, `getMinutes()`, `getSeconds()`).
2. **12h / 24h Toggle**: Formats hours dynamically (`rawHours % 12 || 12`) and toggles AM/PM badge.
3. **Linear Seconds Bar**: Calculates progress percentage `((seconds + 1) / 60) * 100` and updates smooth CSS width transition.
4. **Calendar Metadata**: Calculates day of year (`Math.floor((now - startOfYear) / 86400000) + 1`) and ISO week number.
5. **Quartz Analog Dial**: Calculates hand rotations:
   - Second Hand: `(seconds / 60) * 360` deg
   - Minute Hand: `((minutes + seconds/60) / 60) * 360` deg
   - Hour Hand: `(((hours % 12) + minutes/60) / 12) * 360` deg
