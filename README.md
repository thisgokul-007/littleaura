# LittleAura — Growing Together, Every Day

**LittleAura** is a complete, production-quality, responsive AI-powered parenting web application designed for parents and caregivers of children aged 0 to 3 years. It brings essential childcare management and evidence-informed parenting support into one secure, calm, and trustworthy platform.

---

## 🎨 Mandatory Light-Theme Design System

LittleAura uses a polished light theme across all pages, ensuring high contrast, clean reading areas, and accessible deep navy typography.

| Color Name | Hex Code | Role in Application |
|---|---|---|
| **Pure White** | `#ffffff` | Primary surface, main page backgrounds, cards, form inputs |
| **Aqua Mist** | `#a7ebf2` | Soft highlights, badge accents, subtle background fills |
| **Ocean Teal** | `#54acbf` | Interactive accents, secondary buttons, active indicators |
| **Deep Ocean** | `#26658c` | Primary CTAs, active links, chart series, primary buttons |
| **Navy Blue** | `#023859` | Contrast typography, headings, labels, prominent icons |
| **Midnight Navy** | `#011c40` | Deep contrast, strong branding, header text, security cards |

*Accessible contrast guarantee: Deep navy text is maintained over all aqua and light surfaces. White text is only used over deep navy and ocean surfaces.*

---

## 🛠️ Technology Stack

- **Frontend**:
  - React 18 & Vite
  - Tailwind CSS (Configured with the 6 brand tokens)
  - React Router v6
  - Lucide React icons
  - Recharts for WHO growth curves and sparklines
  - Canvas Confetti for celebratory milestone logging
- **Backend**:
  - Node.js & Express.js REST API (`server/index.js`)
  - Google Gemini API (`gemini-1.5-flash` model for conversational advice and vision analysis)
  - WHO Child Growth Standards (0–36m) analytical engine
  - Web Push Notification subscription endpoints
- **Storage & Security**:
  - Firebase Authentication & Cloud Firestore (Client SDK with demo fallback)
  - Firebase Storage for PDF prescriptions and play photos
  - Strict owner-only Firestore and Storage security rules (`firestore.rules`, `storage.rules`)
  - PWA Service Worker (`public/sw.js`) for background push alerts

---

## 🧭 Application Routes

### Public Routes
- `/`: Editorial landing page with hero product mockup, WHO growth highlights, AI assistant preview, Photo Insight showcase, privacy architecture, interactive FAQ, and footer.
- `/login`: Clean email/password sign-in with password visibility toggle, forgot password link, and redirect to dashboard.
- `/signup`: Account registration with password confirmation, terms & privacy acknowledgement, and validation.
- `/forgot-password`: Password recovery flow sending verification reset instructions.
- `/onboarding`: Multi-step child profile wizard with dynamic age calculation, optional portrait preview, pediatric details, and module selection.

### Protected Application Routes
- `/dashboard`: Unified parenting dashboard with personalized greetings, active child summary, daily care counters, WHO percentile sparkline, upcoming vaccine alerts, low-stock warnings, and quick log modal (+Feed, +Sleep, +Diaper, +Growth).
- `/child`: Multi-child switcher, dynamic age calculation, profile portrait upload/removal, baseline stats, daily routines, and sibling management.
- `/growth`: WHO-calibrated height, weight, and BMI tracker with Metric (cm/kg) vs Imperial (in/lbs) unit toggle, delta comparisons, and full CRUD.
- `/medical`: Digital immunization passport, medical consultation PDF upload/preview, prescription dosage warnings, and doctor visits.
- `/daily-care`: Rapid logging for meals (bottle, solids, nursing), sleep duration, and diaper changes with automatic daily timeline aggregations.
- `/essentials`: Childcare supply inventory with configurable safety thresholds, 1-click restock, and recurring care hygiene tasks.
- `/ai-assistant`: Conversational parenting companion contextualized to your child's age, routine, and historical records with non-diagnostic pediatric disclaimers.
- `/photo-insight`: Non-diagnostic visual play analysis with mandatory parental consent, structured observations, and saved insights archive.
- `/learning`: Early Learning Hub with age-stage and category filters, step-by-step guides, developmental goals, and confetti celebrations.
- `/timeline`: Chronological journal of actual growth logs, daily care routines, vaccinations, and custom milestone recording.
- `/calendar`: Monthly and schedule views for pediatric checkups, vaccine appointments, and recurring hygiene routines.
- `/notifications`: In-app notification center with Web Push Notification API support and Service Worker integration.
- `/profile`: Parent credentials, family role, co-parent linking, and enrolled children overview.
- `/settings`: Unit system preference (Metric/Imperial), notification toggles, privacy settings, AI tone options, full JSON record export, and account deletion confirmation modal.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ and npm installed.

### 2. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Start the Vite development server
npm run dev
```
The application will run at `http://localhost:5173`.

### 3. Backend Server Setup
```bash
# Navigate to the server folder
cd server

# Install server dependencies
npm install

# Start the Express server
node index.js
```
The backend API will run at `http://localhost:5000`.

### 4. Environment Variables
Copy `.env.example` to `.env` in the root directory:
```env
VITE_APP_NAME=LittleAura
VITE_API_URL=http://localhost:5000/api

# Optional: Firebase Live Credentials
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Optional: Gemini API Key for Server
GEMINI_API_KEY=
```

---

## 🔒 Security & Privacy

- **Non-Diagnostic AI**: LittleAura explicitly does not provide clinical diagnoses or prescribe medication dosages. All advice includes clear reminders to consult licensed pediatricians.
- **Data Isolation**: Child records are isolated by `childId` and `parentId`. Switching children completely isolates metrics without cross-child data leakage.
- **Export & Erasure**: Parents retain full ownership of their data with instant JSON archive export and permanent one-click account deletion.

---

## 📄 License
© 2026 LittleAura. All rights reserved.
