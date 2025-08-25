# 🌍 Weather Dashboard

A responsive **Next.js** web app to search and view real-time weather information using the **OpenWeather API**.  
Built with **HTML, CSS, JavaScript, and Next.js** as part of the frontend developer assessment.

---

## 🚀 Features
- 🔎 Search any city and view **current weather** (temperature, condition, humidity, wind).
- ⭐ Save **favorite cities** (stored in localStorage) for quick access.
- ⏳ **Loading** and ⚠️ **error** states for smooth user experience.
- 📱 **Responsive** design for **mobile, tablet, laptop, and desktop**.
- ♿ **Accessible** UI with ARIA roles and semantic HTML.

---

## 🛠 Tech Stack
- **Next.js (App Router)**
- **HTML, CSS, JavaScript (ES6+)**
- **OpenWeatherMap API**

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Akashpal212/weather-dashboard.git
cd weather-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
```bash
Create a `.env.local` file in the root directory with the following:
OPENWEATHER_API_KEY=your_api_key_here
OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
```

### 4. You can get a free API key from: https://openweathermap.org/api

### 5. Run the development server
```bash
npm run dev
```

Open http://localhost:3000 in your browser
