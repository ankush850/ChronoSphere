# System Design & Architecture Overview

ChronoSphere is built using a modern, modular, object-oriented architecture in pure ES6+ JavaScript, CSS3, and HTML5. It has zero external framework dependencies, ensuring maximum performance, instant load times, and portability.

---

## 🏛️ Module Relationship Hierarchy

```
                      +-------------------+
                      |   AppController   |
                      |   (js/app.js)     |
                      +---------+---------+
                                |
       +------------------------+------------------------+
       |                        |                        |
+------v-------+        +-------v------+        +--------v-------+
| ClockManager |        | WorldClock   |        | Stopwatch      |
| (clock.js)   |        | (world.js)   |        | (stopwatch.js) |
+--------------+        +--------------+        +----------------+
       |                        |                        |
+------v-------+        +-------v------+        +--------v-------+
| TimerManager |        | AlarmManager |        | Pomodoro       |
| (timer.js)   |        | (alarm.js)   |        | (pomodoro.js)  |
+--------------+        +--------------+        +----------------+
       |                        |                        |
+------v-------+        +-------v------+        +--------v-------+
| Weather      |        | Ambience     |        | EventsManager  |
| (weather.js) |        | (ambience.js)|        | (events.js)    |
+--------------+        +--------------+        +----------------+
       |                        |                        |
+------v-------+        +-------v------+        +--------v-------+
| Analytics    |        | ChimeManager |        | CustomTheme    |
| (analytics.js|        | (chime.js)   |        | (customTheme.js|
+--------------+        +--------------+        +----------------+
                                |
                       +--------v-------+
                       |  SoundEngine   |
                       |  (js/sound.js) |
                       +----------------+
```

---

## 🔑 Design Principles

1. **Decoupled Feature Modules**: Every view component (`ClockManager`, `WorldClockManager`, `StopwatchManager`, etc.) is an isolated ES6 class encapsulated in `js/modules/`.
2. **Single Source of Truth**: Global application configuration is managed by `State` in `js/state.js` and persisted to `localStorage`.
3. **Hardware-Accelerated UI**: Glassmorphic effects, circular SVG rings, and digital digit glows leverage GPU acceleration (`transform: translate3d`, `backdrop-filter`).
