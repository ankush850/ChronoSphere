# ChronoSphere — Feature Specifications & User Guide

ChronoSphere provides a comprehensive suite of modern time management utilities.

---

## 🌟 Feature Breakdown

### 1. Master Digital Clock & Quartz Analog Dial
- **12-Hour / 24-Hour Format**: Instant format conversion with AM/PM indicator badge.
- **Seconds Progress Bar**: Smooth linear tracker mapping 0s to 60s within each minute.
- **Full Date & Calendar Details**: Day of week, Month, Date, Year, Day of Year (e.g. Day 232 / 365), and Week Number.
- **Local Timezone Identifier**: Detects timezone name and UTC offset (e.g. `Asia/Calcutta (UTC+05:30)`).
- **Smooth Analog Dial**: Toggleable companion dial rendered via SVG/CSS with real-time rotating hands.

### 2. World Clock
- **Global Time Monitoring**: Track real-time clocks across international tech & financial hubs.
- **Time Offsets**: Displays relative time difference (e.g., `+4.5 hrs`, `-9.5 hrs`) and current local date.
- **Add / Remove Cities**: Interactive modal to select and add global cities.

### 3. Precision Stopwatch & Lap Table
- **Millisecond Timing**: High-precision stopwatch tracking `HH:MM:SS.ms`.
- **Lap Recording**: Capture lap splits and cumulative elapsed time.
- **Lap Analytics**: Highlights **⚡ Fastest Lap** in emerald green and **🐢 Slowest Lap** in coral red.

### 4. Circular Countdown Timer
- **Visual Ring Progress**: Depleting circular SVG stroke animation matching countdown progress.
- **Quick Presets**: 1 min, 5 min, 10 min, 15 min, 25 min (Pomodoro), 30 min, 45 min, 1 hour.
- **Custom Duration**: Inputs for Hours, Minutes, Seconds + "+1 Min" quick extension.

### 5. Smart Alarms
- **Multi-Alarm Management**: Set alarms with custom labels and tone selections.
- **Synthesized Melodies**: Web Audio API generated alerts (*Cyber Chime*, *Energetic Pulse*, *Gentle Zen Bell*).
- **Snooze & Dismiss**: Ringing modal overlay with 5-minute snooze and dismiss controls.

### 6. Pomodoro Focus Timer
- **Structured Work Sessions**: Focus (25m), Short Break (5m), and Long Break (15m).
- **Session Progress Tracker**: Visual cycle indicator tracking 4 sessions per work block.

### 7. Theme Presets
- 🖤 **Midnight OLED**: High-contrast pure black and crisp white styling.
- 🌅 **Sunset Blaze**: Warm amber glow, pink accents, and deep violet backdrop.
- 🟢 **Matrix Retro**: Sci-fi green phosphor glow.
- ❄️ **Nordic Aurora**: Emerald teal and arctic cyan.
- ☀️ **Clean Light**: Crisp daylight mode with high-contrast black typography.

---

## ⌨️ Keyboard Shortcuts

- <kbd>1</kbd> - <kbd>6</kbd>: Navigate between tabs (Clock, World, Stopwatch, Timer, Alarm, Pomodoro)
- <kbd>Space</kbd>: Start / Pause active Stopwatch, Timer, or Pomodoro session
- <kbd>F</kbd>: Toggle Zen Fullscreen / Desk Clock view
- <kbd>Esc</kbd>: Close modal dialogs or dropdown menus
