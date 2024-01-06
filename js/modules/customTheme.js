/* Custom Theme Color Picker & Generator */
import { State, STORAGE_KEYS, saveStorage } from '../state.js';
import { Sound } from '../sound.js';

export class CustomThemeManager {
  constructor() {
    this.openBtn = document.getElementById('openCustomThemeBtn');
    this.modal = document.getElementById('customThemeModal');
    this.closeBtn = document.getElementById('closeCustomThemeModalBtn');
    this.cancelBtn = document.getElementById('cancelCustomThemeBtn');
    this.applyBtn = document.getElementById('applyCustomThemeBtn');

    this.bgColorInput = document.getElementById('customBgColor');
    this.accentColorInput = document.getElementById('customAccentColor');
    this.textColorInput = document.getElementById('customTextColor');

    this.init();
  }

  init() {
    if (!this.openBtn) return;

    this.openBtn.addEventListener('click', () => {
      this.modal.classList.remove('hidden');
      Sound.playClick();
    });

    const closeModal = () => {
      this.modal.classList.add('hidden');
      Sound.playClick();
    };

    this.closeBtn.addEventListener('click', closeModal);
    this.cancelBtn.addEventListener('click', closeModal);

    this.applyBtn.addEventListener('click', () => {
      const bg = this.bgColorInput.value;
      const accent = this.accentColorInput.value;
      const text = this.textColorInput.value;

      this.applyCustomTheme(bg, accent, text);
      closeModal();
    });
  }

  applyCustomTheme(bg, accent, text) {
    const styleId = 'custom-theme-styles';
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = `
      [data-theme="custom"] {
        --bg-base: ${bg};
        --bg-gradient: radial-gradient(circle at 50% 20%, ${bg} 0%, #000000 90%);
        --glow-1: ${accent};
        --glow-2: ${accent};
        --glow-3: ${accent};
        --card-bg: rgba(20, 20, 30, 0.75);
        --card-border: ${accent}44;
        --card-border-hover: ${accent};
        --card-shadow: 0 16px 40px rgba(0, 0, 0, 0.8);
        --text-main: ${text};
        --text-muted: ${text}aa;
        --text-accent: ${accent};
        --accent-glow: ${accent};
        --accent-grad: linear-gradient(135deg, ${accent} 0%, ${text} 100%);
        --btn-primary-bg: ${accent};
        --btn-primary-text: #000000;
        --btn-secondary-bg: rgba(255, 255, 255, 0.08);
        --btn-secondary-border: ${accent}44;
        --digit-glow: 0 0 25px ${accent}aa;
        --dial-bg: rgba(10, 10, 20, 0.9);
        --dial-hand-sec: ${accent};
        --dropdown-bg: #0b0d19;
      }
    `;

    document.documentElement.setAttribute('data-theme', 'custom');
    State.theme = 'custom';
    saveStorage(STORAGE_KEYS.THEME, 'custom');
  }
}
