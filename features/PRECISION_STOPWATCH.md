# Feature: Precision Stopwatch & Split Lap Analytics

High-precision timing tool designed for athletic tracking and time auditing.

---

## ⚙️ How It Works

1. **`performance.now()` Engine**: Uses microsecond-precision browser clock instead of drift-prone `setInterval`.
2. **`requestAnimationFrame` Rendering Loop**: Renders smooth 60fps millisecond updates (`HH:MM:SS.ms`).
3. **Split Lap Analytics**: Computes split delta `currentElapsed - lastLapTime` and highlights:
   - ⚡ **Fastest Lap** in emerald green (`#10b981`)
   - 🐢 **Slowest Lap** in coral red (`#ef4444`)
