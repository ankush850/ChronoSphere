# ChronoSphere — Developer Setup & Customization Guide

This guide explains how to extend, customize, and maintain the ChronoSphere codebase.

---

## 🛠️ Quick Setup

No build step or Node.js environment is required!

1. Clone or download the repository.
2. Open [`index.html`](file:///c:/Users/ankus/Downloads/Digital-clock-main/index.html) in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Apple Safari).
3. Optionally, serve using any static web server (VS Code Live Server, Python `http.server`, or `npx serve`).

---

## 🎨 How to Add a New Theme

1. Open [`css/variables.css`](file:///c:/Users/ankus/Downloads/Digital-clock-main/css/variables.css).
2. Add a new theme block:

```css
[data-theme="my-theme"] {
  --bg-base: #101828;
  --bg-gradient: radial-gradient(circle at 50% 20%, #1e293b 0%, #101828 85%);
  --glow-1: #6366f1;
  --glow-2: #8b5cf6;
  --glow-3: #ec4899;
  --card-bg: rgba(30, 41, 59, 0.65);
  --card-border: rgba(99, 102, 241, 0.25);
  --card-border-hover: rgba(139, 92, 246, 0.45);
  --card-shadow: 0 16px 40px rgba(0, 0, 0, 0.7);
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --text-accent: #818cf8;
  --accent-glow: #6366f1;
  --accent-grad: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  --btn-primary-bg: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  --btn-primary-text: #ffffff;
  --btn-secondary-bg: rgba(255, 255, 255, 0.08);
  --btn-secondary-border: rgba(99, 102, 241, 0.25);
  --digit-glow: 0 0 25px rgba(99, 102, 241, 0.5);
  --dial-bg: rgba(15, 23, 42, 0.85);
  --dial-hand-sec: #ec4899;
  --dropdown-bg: rgba(15, 23, 42, 0.96);
}
```

3. Add a button in [`index.html`](file:///c:/Users/ankus/Downloads/Digital-clock-main/index.html) inside `#themeDropdown`:

```html
<button class="theme-option" data-theme="my-theme">
  <span class="theme-dot" style="background: linear-gradient(135deg, #6366f1, #8b5cf6);"></span>
  My Custom Theme
</button>
```

---

## 🌍 How to Add New World Clock Cities

1. Open [`js/modules/world.js`](file:///c:/Users/ankus/Downloads/Digital-clock-main/js/modules/world.js).
2. Add your city timezone to `cityMetadata`:

```javascript
'Europe/Rome': { name: 'Rome', country: 'Italy' }
```

3. Add an `<option>` to the select element in [`index.html`](file:///c:/Users/ankus/Downloads/Digital-clock-main/index.html):

```html
<option value="Europe/Rome">Rome (CET, Italy)</option>
```
