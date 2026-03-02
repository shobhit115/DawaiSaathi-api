<div align="center">

# 🩺 Davai Saathi

### AI-powered medicine information platform built for the Indian public

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Vercel-black?style=for-the-badge)](https://dawaisaathi.vercel.app/)
[![Backend API](https://img.shields.io/badge/🔗_Backend_API-Render-46E3B7?style=for-the-badge)](https://dawaisaathi-api.onrender.com/api/)
[![Dataset](https://img.shields.io/badge/📦_Dataset-Kaggle-20BEFF?style=for-the-badge)](https://www.kaggle.com/datasets/mohneesh7/indian-medicine-data)

*Search or scan medicines and get simple Hindi explanations with audio output.*

**[Frontend Repo](https://github.com/shobhit115/DawaiSaathi/) · [Backend Repo](https://github.com/shobhit115/DawaiSaathi-api/)**

</div>

---

## 🚀 The Problem

Medicine leaflets in India are complex and written in English — leading to **misuse, overdose, and unsafe self-medication**. Davai Saathi uses AI to deliver simple, Hindi explanations of any medicine, with audio playback.

---

## 🎯 Features

| Feature | Status |
|---|---|
| Search medicine by name | ✅ |
| OCR-based medicine strip scanning | ✅ |
| AI-generated Hindi explanation | ✅ |
| Text-to-Speech audio playback | ✅ |
| Fuzzy search (MongoDB Atlas) | ✅ |
| 7,400+ Indian medicines | ✅ |
| Authentication | ❌ Coming soon |

---

## 🏗️ Architecture
```
React (Browser) → Express API → MongoDB Atlas → Gemini API → Web Speech API (TTS)
```

**Search Flow:** User searches → Atlas fuzzy match → Gemini explains in Hindi → Audio plays

**OCR Flow:** User uploads strip image → TensorReact.js reads text → Atlas matches → Gemini explains → Audio plays

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React (Vite), Tailwind CSS, Axios, Web Speech API, TensorReact.js |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Fuzzy Search) |
| AI | Google Gemini API |

---

## 🔍 API Endpoints
```http
GET  /api/medicine-direct?name=NAME   # Search medicine
POST /api/llm-analyze                 # OCR image upload (form-data: image, language)
```

---

## ⚙️ Local Setup
```bash
# Backend
git clone https://github.com/shobhit115/DawaiSaathi-api/
cd backend && npm install && npm run dev

# Frontend
git clone https://github.com/shobhit115/DawaiSaathi/
cd frontend && npm install && npm run dev
```

**Backend `.env`:**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_key
```

**Frontend `.env`:**
```env
VITE_BACKEND_URL=https://dawaisaathi-api.onrender.com/api
```

---

## 📈 Roadmap

- [ ] 🔐 User authentication
- [ ] 📱 Mobile app
- [ ] 🌐 Multi-language support (Tamil, Bengali, Marathi...)
- [ ] 🧠 Conversational NLP chatbot
- [ ] 💊 Prescription analysis

---

## ⚠️ Disclaimer

> This platform is for **informational purposes only** and does not replace professional medical advice. Always consult a qualified doctor before taking any medication.

---

<div align="center">
Made with ❤️ for India's healthcare accessibility
</div>
