# 🛡️ SENTINEL — Bot Detection Engine

A real-time bot detection system built with React that uses behavioral analysis and browser fingerprinting to distinguish humans from bots. No CAPTCHA puzzles, no checkboxes — just silent, behind-the-scenes detection.

## 🎯 What Does It Do?

SENTINEL monitors user interactions on a webpage and assigns a **Human Score (0–100)** based on multiple behavioral signals. Think of it as a simplified version of what Cloudflare, Google reCAPTCHA v3, and Akamai use behind the scenes.

**Live Demo Features:**
- Real-time mouse trail visualization
- Live score gauge that updates as you interact
- Signal breakdown showing individual detection metrics
- Bot simulation mode to demonstrate detection in action
- Full browser fingerprint viewer

## 🔍 Detection Signals

### 1. Mouse Movement Analysis
Humans move their mouse in curved, unpredictable paths. Bots move in straight lines or teleport between coordinates.

**How it works:**
- **Straightness Ratio** = Total curved distance / Direct distance (point A to B)
  - Ratio ≈ 1.0 → perfectly straight → likely bot
  - Ratio > 1.2 → natural curves → likely human
- **Speed Variance** = Standard deviation of mouse speed between consecutive points
  - Low variance → constant speed → likely bot
  - High variance → natural acceleration/deceleration → likely human

### 2. Keystroke Dynamics
Humans type with varying rhythm. Bots type at machine-like consistent intervals.

**How it works:**
- **Average Inter-Key Delay** — Time gap between consecutive keystrokes
  - < 20ms → humanly impossible → bot
  - 50ms+ → normal human typing speed
- **Typing Variance** — Standard deviation of inter-key delays
  - Low std dev → too uniform → bot
  - High std dev → natural rhythm variation → human

### 3. Honeypot Trap
An invisible form field (hidden via CSS) that real users never see or interact with. Bots parse the DOM and fill all fields, including hidden ones.

**How it works:**
- A hidden `<input>` is placed off-screen (`position: absolute; left: -9999px`)
- `tabIndex={-1}` prevents keyboard navigation to it
- `autoComplete="off"` prevents browser autofill false positives
- If the field gets filled → **100% bot**. Zero false positives.

### 4. Browser Fingerprinting
Every browser leaks information about the device it's running on. Headless browsers and bot frameworks have detectable anomalies.

**Data collected:**
- Screen resolution, color depth
- Timezone, language, platform
- CPU cores, device memory
- WebGL GPU renderer
- Touch support, cookie status

**Anomaly detection:**
- Screen resolution `0x0` → headless browser
- GPU = "SwiftShader" → software rendering (headless indicator)
- Touch support on Windows desktop → mismatch
- Cookies disabled → unusual for real users

### 5. Weighted Scoring Engine
All signals are combined using a weighted scoring system:

| Signal | Weight | Rationale |
|--------|--------|-----------|
| Honeypot | 20/100 | Binary signal, highest confidence |
| Mouse Path | 15/100 | Strong behavioral indicator |
| Typing Speed | 15/100 | Strong behavioral indicator |
| Mouse Speed Variance | 10/100 | Supporting signal |
| Typing Variance | 10/100 | Supporting signal |
| Interaction Speed | 10/100 | Time-based check |
| Click Pattern | 10/100 | Supporting signal |
| Fingerprint | 5/100 | Weak alone, useful in combination |
| Scroll Behavior | 5/100 | Minor supporting signal |

**Score interpretation:**
- **70–100** → Likely Human (green)
- **40–69** → Suspicious (yellow)
- **0–39** → Likely Bot (red)

## 🏗️ Project Structure

```
sentinel-bot-detector/
├── src/
│   ├── components/
│   │   ├── MouseTracker.jsx      # Mouse movement capture + SVG trail
│   │   ├── TypingAnalyzer.jsx    # Keystroke dynamics tracking
│   │   ├── HoneypotField.jsx     # Invisible trap field
│   │   ├── Fingerprint.jsx       # Browser fingerprint display
│   │   ├── ScoreGauge.jsx        # Circular SVG score meter
│   │   └── SignalBar.jsx         # Individual signal progress bar
│   ├── utils/
│   │   ├── mouseAnalysis.js      # Straightness ratio + speed variance
│   │   ├── keystrokeAnalysis.js  # Typing speed + variance calculations
│   │   ├── fingerprint.js        # Browser data collection + anomaly detection
│   │   └── scoringEngine.js      # Weighted signal combination
│   ├── App.jsx                   # Main layout + state management
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Entry point
├── package.json
└── index.html
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/sentinel-bot-detector.git

# Navigate to the project
cd sentinel-bot-detector

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Usage

1. **Move your mouse** in the tracking area — watch the green trail and straightness ratio
2. **Type in the input fields** — observe keystroke timing analysis
3. **Check the dashboard** — see your real-time Human Score and signal breakdown
4. **Click "SIMULATE BOT"** — inject fake bot data and watch the score drop to red
5. **Click "RESET"** — return to live detection mode
6. **View browser fingerprint** — see what data your browser exposes

## 🧠 Key Concepts Demonstrated

- **Behavioral Biometrics** — Using interaction patterns (mouse, keyboard) as identity signals
- **Browser Fingerprinting** — Collecting device/browser metadata for identification
- **Honeypot Technique** — Invisible traps that exploit bot behavior
- **Weighted Scoring Systems** — Combining multiple weak signals into strong classification
- **Statistical Analysis** — Standard deviation, variance, ratio calculations for anomaly detection
- **React Patterns** — Lifting state up, useRef vs useState, useCallback, parent-child data flow

## 🛠️ Tech Stack

- **React** (with Vite) — Frontend framework
- **Plain CSS** — No external UI libraries
- **SVG** — Circular gauge and mouse trail visualization
- **Browser APIs** — WebGL, Navigator, Screen, Intl

## 📚 Real-World Context

This project demonstrates simplified versions of techniques used by:

- **Cloudflare Bot Management** — Behavioral analysis + fingerprinting at scale
- **Google reCAPTCHA v3** — Invisible scoring (no user interaction required)
- **Akamai Bot Manager** — Multi-signal detection with ML
- **fingerprint.js** — Open-source browser fingerprinting library

## ⚠️ Limitations

This is an educational/portfolio project. Production bot detection systems additionally use:

- Machine learning models trained on millions of sessions
- Canvas fingerprinting (drawing patterns)
- Audio context fingerprinting
- TLS/JA3 fingerprinting (network level)
- IP reputation databases
- Rate limiting and session analysis
- WebDriver/automation framework detection

## 📄 License

MIT License — feel free to use, modify, and distribute.

## 🤝 Contributing

Contributions are welcome! Some ideas for improvement:

- Add canvas fingerprinting
- Implement scroll behavior analysis
- Add a backend API for logging sessions
- Build a session replay viewer
- Add WebDriver detection (`navigator.webdriver`)
- Implement time-on-page analysis
