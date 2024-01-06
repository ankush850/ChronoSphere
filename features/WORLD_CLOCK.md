# Feature: World Clock & International Time Zones

The World Clock view monitors real-time clocks across international financial and tech hubs.

---

## ⚙️ How It Works

1. **`Intl.DateTimeFormat` Engine**: Formats time according to target IANA timezone strings (`America/New_York`, `Europe/London`, `Asia/Tokyo`).
2. **Relative Offset Calculation**: Compares UTC time offset of local machine against target timezone to display badges (e.g. `+4.5 hrs`, `-9.5 hrs`).
3. **Interactive City Manager**: Modal dialog allowing users to add or remove custom global cities with `localStorage` persistence.
