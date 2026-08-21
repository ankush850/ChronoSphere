# ⏱️ ChronoSphere — Next-Gen Digital Clock & Time Suite

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" alt="Status Badge"/>
  <img src="https://img.shields.io/badge/Vanilla-HTML5%20%7C%20CSS3%20%7C%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Tech Stack"/>
  <img src="https://img.shields.io/badge/Audio-Web%20Audio%20API-blueviolet?style=for-the-badge" alt="Web Audio API"/>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License"/>
</p>

ChronoSphere is a modern, high-precision, all-in-one web time suite. Engineered with pure vanilla web technologies (HTML5, CSS3, ES6+ JavaScript), it delivers a sleek glassmorphic UI, zero external runtime dependencies, synthesized ambient sound alerts via the Web Audio API, and a complete suite of time utilities.

---

## 🌟 Key Features

### 1. 🕒 Master Digital Clock & Analog Quartz Dial
- **12-Hour / 24-Hour Toggle**: Seamless one-click switching with dynamic AM/PM badge.
- **Seconds Progress Bar**: Smooth linear progress indicator tracking `0s -> 60s` within each minute.
- **Detailed Date & Calendar**: Displays Day of Week, Month, Date, Year, Day of Year (e.g. *Day 233 / 365*), and ISO Week Number.
- **Timezone Detection**: Automatically resolves local timezone identifier and UTC offset (e.g., `Asia/Calcutta (UTC+05:30)`).
- **Smooth Analog Dial**: Toggleable SVG quartz dial with real-time rotating hour, minute, and second hands.
- **Zen / Desk Clock Mode**: Fullscreen distraction-free desk clock interface (<kbd>F</kbd> key).

### 2. 🌍 World Clock
- **Global Time Monitoring**: Track multiple international time zones (Tokyo, London, New York, Sydney, Paris, Dubai, etc.).
- **Relative Offset Calculation**: Displays live time differences (e.g., `+4.5 hrs`, `-9.5 hrs`) alongside the local date in each city.
- **City Manager**: Intuitive modal to add and remove global locations dynamically.

### 3. ⏱️ Precision Stopwatch & Lap Analytics
- **Millisecond Precision**: Ultra-accurate stopwatch timing down to the millisecond (`HH:MM:SS.ms`).
- **Lap Recorder**: Save splits and cumulative elapsed time.
- **Smart Lap Analytics**: Automatically highlights the ⚡ **Fastest Lap** (Emerald green) and 🐢 **Slowest Lap** (Coral red).

### 4. ⏳ Circular Countdown Timer
- **Animated Circular Progress**: Depleting SVG ring animation synchronized with the countdown duration.
- **Quick Presets**: Instant start presets (1m, 5m, 10m, 15m, 25m, 30m, 45m, 1h).
- **Custom Duration & Quick Add**: Easy input for Hours, Minutes, and Seconds with a "+1 Min" quick extension button.

### 5. 🔔 Smart Multi-Alarms
- **Custom Alarms**: Set multiple alarms with custom titles and tone selections.
- **Synthesized Melodies**: 100% code-generated alert tones via the Web Audio API (*Cyber Chime*, *Energetic Pulse*, *Gentle Zen Bell*) — no external `.mp3` files required.
- **Snooze & Dismiss**: Ringing overlay with a 5-minute snooze and dismiss controls.

### 6. 🍅 Pomodoro Focus Suite
- **Productivity Intervals**: Focus (25m), Short Break (5m), and Long Break (15m).
- **Session Progress Tracker**: Visual 4-cycle dots indicator to keep track of completed work blocks.

### 7. 🎨 Theming System & Glassmorphism
- **5 Curated Themes**:
  - 🖤 **Midnight OLED**: High-contrast pure black and crisp white glow.
  - 🌅 **Sunset Blaze**: Warm amber glow with vibrant violet undertones.
  - 🟢 **Matrix Retro**: Cyberpunk green phosphor terminal aesthetic.
  - ❄️ **Nordic Aurora**: Emerald teal and arctic cyan glow.
  - ☀️ **Clean Light**: High-contrast daytime mode.
- **Persistent State**: All user settings, alarms, world clocks, and theme preferences automatically persist in `localStorage`.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| <kbd>1</kbd> - <kbd>6</kbd> | Switch between tabs (Clock, World, Stopwatch, Timer, Alarm, Pomodoro) |
| <kbd>Space</kbd> | Start / Pause active Stopwatch, Timer, or Pomodoro |
| <kbd>F</kbd> | Toggle Zen Fullscreen / Desk Clock mode |
| <kbd>Esc</kbd> | Close any open modal dialog or menu |

---

## 📁 Project Structure

```plaintext
Digital-clock/
├── index.html               # Main application markup & UI structure
├── css/
│   ├── main.css             # Main stylesheet bundle
│   ├── base/                # Reset, variables, design tokens & typography
│   ├── components/          # Cards, buttons, tabs, modals, analog clock
│   ├── features/            # Feature-specific styles (Stopwatch, Timer, etc.)
│   └── themes/              # Theme definitions (OLED, Aurora, Matrix, etc.)
├── js/
│   ├── app.js               # Application entry point & tab router
│   ├── state.js             # Central state manager & LocalStorage persistence
│   ├── sound.js             # Web Audio API sound synthesizer
│   └── modules/             # Modular feature controllers
│       ├── clock.js         # Digital & analog clock logic
│       ├── worldClock.js    # World clock manager
│       ├── stopwatch.js     # Stopwatch & lap analytics
│       ├── timer.js         # Countdown timer logic
│       ├── alarm.js         # Alarm system & snooze logic
│       ├── pomodoro.js      # Pomodoro focus session tracker
│       └── theme.js         # Theme switching & persistence
├── docs/                    # Detailed user guides & architecture documentation
│   ├── ARCHITECTURE.md
│   ├── FEATURES.md
│   ├── GUIDE.md
│   └── DEVELOPER_GUIDE.md
└── architecture/            # Deep-dive system design & data flow docs
```

---

## 🚀 Getting Started

### Prerequisites
No Node.js or build tools required! Works directly in any modern web browser (Chrome, Edge, Firefox, Safari, Brave, Opera).

### Running Locally

1. **Clone or Download the Repository:**
   ```bash
   git clone https://github.com/ankush850/Digital-clock.git
   ```

2. **Open the App:**
   - Simply double-click `index.html` to open it in your default browser, or
   - Use VS Code **Live Server** extension, or
   - Run a simple local server:
     ```bash
     # Python 3
     python -m http.server 3000
     
     # Node.js
     npx serve .
     ```

3. **Navigate to:** `http://localhost:3000`

---

## 🛠️ Technology Stack

- **Markup**: Semantic HTML5 with SVG dial and ring graphics
- **Styling**: Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Glassmorphism, Backdrop Filters, Keyframe Animations)
- **Scripting**: Vanilla ES6+ JavaScript (Modular design, Clean State Pattern)
- **Audio**: Web Audio API (Synthesized Oscillators & Gain Nodes)
- **Fonts**: Google Fonts (*JetBrains Mono*, *Orbitron*, *Plus Jakarta Sans*)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free for personal and commercial use.

---

<p align="center">
  Crafted with ❤️ by <b>Ankush</b>
</p>
