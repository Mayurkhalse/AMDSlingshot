# 🥗 NutriSense MVP 
> Your offline, privacy-first smart nutrition assistant.

NutriSense is a blazing fast, entirely client-side web application designed to help you track your daily macronutrients effortlessly. With zero backend databases and a curated catalog of authentic Indian dishes, it helps you meet your nutritional goals securely right from your own browser.

## ✨ Features
- **Intelligent Onboarding**: Calculates your specific Total Daily Energy Expenditure (TDEE) baseline using the proven Harris-Benedict formula.
- **Offline Persistence**: Relies purely on your browser's local storage. This means there are no loading screens, zero loading latency, and your data stays 100% private locally.
- **Pre-loaded DB Logging**: A localized, ultra-fast mock database containing 50 unique items ranging from Paneer Bhurji to Palak Paneer with precise serving measurements.
- **AI-Powered Insights**: Iteratively communicates with the Google `Gemini 2.0 Flash` API. NutriSense aggregates your macro consumption throughout the day and generates tailored, motivating, and actionable advice to guide your habits.
- **Fully Responsive UI**: Engineered heavily with Tailwind CSS v4, yielding a gorgeous layout on Mobile devices and an expanded, fluid dual-pane dashboard on Desktop monitors.
- **Built-in Streak Tracking**: Keeps you accountable and consistent by discreetly logging your consecutive days on the platform.

## 🚀 Quick Setup

1. **Install Dependencies**
   Ensure you're inside the project folder, then run:
   ```bash
   npm install
   ```

2. **Access Google Gemini**
   To leverage the `AI NutriTip` functionality, fetch your completely free Gemini key at [Google AI Studio](https://aistudio.google.com/app/apikey).
   
   Open the `.env` file in the root of the UI and swap out the placeholder value:
   ```env
   VITE_GEMINI_API_KEY=your_key_here
   ```

3. **Run the Development Server**
   Launch the Vite runtime locally with:
   ```bash
   npm run dev
   ```

## 🛠️ Tech Stack
- **Library**: React 19 (via Vite)
- **Styling**: Tailwind CSS v4
- **State engine**: Custom `useMealLog.js` wrapped over HTML5 `localStorage`
- **AI**: Gemini 2.0 Flash API

*Developed precisely for a 30-minute MVP mock sprint pipeline.*
