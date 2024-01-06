# Data Flow & State Management Architecture

ChronoSphere maintains an immutable unidirectional state architecture using `js/state.js`.

---

## 🔄 State Lifecycle

```
[ User Interaction ] ──> [ Event Listener ] ──> [ Update State Object ]
                                                       │
                                                       ▼
[ LocalStorage Sync ] <── [ saveStorage() ] <── [ Component Re-render ]
```

---

## 💾 LocalStorage Key Registry

| Key | Purpose | Default Value |
|---|---|---|
| `chronosphere_theme` | Active UI theme palette name | `"aurora"` |
| `chronosphere_is24h` | Format toggle flag | `false` |
| `chronosphere_sound` | Global sound FX toggle | `true` |
| `chronosphere_analog` | Analog dial visibility flag | `false` |
| `chronosphere_cities` | Saved world clock cities JSON | Preset 5 cities |
| `chronosphere_alarms` | Saved alarms schedule JSON | `[]` |
| `chronosphere_events` | Saved countdown events JSON | Default events |
| `chronosphere_analytics` | Pomodoro focus time & streak stats | Stats object |
