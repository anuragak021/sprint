# SPRINT — Smart Precision Remote Irrigation Network Technology

> A Remote and Timer-Controlled Smart Spraying System for Precision Agriculture

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/anuragak021/sprint)

## About

**SPRINT** is a B.Tech final-year project by students of the Department of Electronics and Communication Engineering, Delhi Technological University (2026).

The system automates water, pesticide, and liquid fertilizer distribution in farms and gardens using:

- **ESP-01 (ESP8266)** Wi-Fi microcontroller
- **Firebase Realtime Database** as the cloud backbone
- **Android mobile app** for remote real-time control
- **Relay + Pressure Pump + Solenoid Valve** actuation layer
- **LM2596 & MT3608** voltage converters for stable power

## Team

| Name | Roll No |
|------|---------|
| Anurag Kumar | 2K22/EC/46 |
| Chirag Sikriwal | 2K22/EC/75 |
| Devayush Devandra | 2K22/EC/88 |

**Supervisor:** Dr. Yashna Sharma, Assistant Professor, ECE — DTU

## Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** Vanilla JS (Angular-style SPA), HTML5, CSS3
- **Deployment:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
sprint/
├── server.js          # Express server
├── package.json
├── vercel.json        # Vercel deployment config
└── public/
    ├── index.html     # SPA entry point
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

## Deploy on Vercel

1. Push this repo to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Select framework: **Other** (Node.js)
4. Click **Deploy**

---

© 2026 SPRINT Project · Delhi Technological University · ECE Department
# sprint
