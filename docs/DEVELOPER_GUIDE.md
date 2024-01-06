# Developer Setup & Contribution Guide

This guide provides instructions for developers looking to maintain, customize, or contribute to ChronoSphere.

---

## 💻 Environment Setup

- **Zero Build Setup**: No Node.js compilation required! Open [`index.html`](file:///c:/Users/ankus/Downloads/Digital-clock-main/index.html) in any modern web browser.
- **Local Development Server**: Optionally run `npx serve` or VS Code Live Server for instant hot reloading.

---

## 🧱 Module Architecture Standards

1. Each feature module resides inside `js/modules/` as an ES6 class.
2. Component styles reside inside `css/components/` and are imported into `css/main.css`.
3. Application state changes MUST use `State` in `js/state.js` and call `saveStorage()`.
