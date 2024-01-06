# Feature: Countdown Timer & SVG Progress Ring

Circular visual countdown timer with preset quick-buttons and custom duration inputs.

---

## ⚙️ How It Works

1. **Circular SVG Animation**: Manipulates `stroke-dashoffset` on `<circle class="ring-fill">` based on `circumference - fraction * circumference`.
2. **Quick Presets**: Single-click preset pills for 1m, 5m, 10m, 15m, 25m, 30m, 1h.
3. **Audio & System Notifications**: Plays Web Audio chime on completion and triggers browser native desktop notifications.
