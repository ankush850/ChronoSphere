# Web Audio API Sound Synthesizer Architecture

ChronoSphere eliminates external MP3/WAV audio files by utilizing browser-native **Web Audio API** synthesis in `js/sound.js` and `js/modules/ambience.js`.

---

## 🔊 Sound Generation Algorithms

### 1. UI Click Feedback
- **Oscillator Type**: `sine`
- **Frequency Ramp**: Exponential drop from 800Hz to 400Hz over 40ms.
- **Gain Envelope**: Exponential decay from 0.08 to 0.001.

### 2. Alarm Alert Tunes
- **Cyber Chime**: 4-note ascending sequence (440Hz, 554.37Hz, 659.25Hz, 880Hz) repeated every 1.6s.
- **Energetic Pulse**: Square wave burst (987.77Hz) with 4 rapid pulses.
- **Gentle Zen Bell**: Triangle wave triad (523.25Hz, 659.25Hz, 783.99Hz) with long 800ms decay.

### 3. Ambient Audio Noise Synthesizer
- **Rain Noise**: Brown/pink noise filter algorithm using white noise integration `output[i] = (lastOut + 0.02 * white) / 1.02`.
- **Ocean Waves**: Modulated white noise modulated by low-frequency sine LFO `Math.sin(i / 15000)`.
- **Binaural Focus**: Pure 432Hz sine wave generator for deep focus.
