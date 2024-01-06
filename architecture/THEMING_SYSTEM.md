# CSS Variable & Custom Palette Architecture

The styling system uses dynamic CSS Custom Properties attached to `[data-theme="..."]` on the root `<html>` element.

---

## 🎨 Theme Tokens Registry

| Token Variable | Description |
|---|---|
| `--bg-base` | Primary background color |
| `--bg-gradient` | Radial background glow gradient |
| `--glow-1`, `--glow-2`, `--glow-3` | Ambient blurred backdrop glow circles |
| `--card-bg` | Glassmorphism card surface background |
| `--card-border` | Glass card border stroke |
| `--card-border-hover` | Interactive hover border color |
| `--text-main` | Primary body typography color |
| `--text-muted` | Subtitle & secondary metadata color |
| `--text-accent` | Highlighted digits & brand accent color |
| `--accent-glow` | Text glow shadow color |
| `--dropdown-bg` | Solid dropdown menu background |

---

## ☀️ Light Theme High-Contrast Rules

In `[data-theme="light"]`, dropdown menus enforce explicit solid white `#ffffff` background with 100% solid pitch black `#000000` text options to guarantee readability across all displays.
