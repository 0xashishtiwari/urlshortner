

```markdown
# 🔗 URL Shortener - Frontend

This is the **React frontend** for a simple and responsive URL shortener application.  
Users can input a long URL and receive a shortened link that redirects to the original.

---

## 🌐 Live Demo

> [https://your-netlify-app.netlify.app](https://your-netlify-app.netlify.app)  
_(Replace with your actual deployed link)_

---

## ⚙️ Features

- 🎨 Clean and responsive UI
- 📱 Mobile-friendly design
- ✨ Animated navbar and form card
- 🧠 Auto-detect duplicate URLs
- 🔗 One-click access to shortened link

---

## 🛠 Tech Stack

- [React](https://reactjs.org/)
- CSS (Vanilla)
- Axios (for API requests)
- [Netlify](https://www.netlify.com/) (for deployment)

---



---

## 🚀 Getting Started (Local Development)

### 1. Clone the repo


### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev  # If using Vite
# OR
npm start    # If using Create React App
```

---

## 🔧 Environment Setup

> Make sure your backend is running on `http://localhost:3000`
> You can edit the Axios URL in `ShortenerForm.js` to match your backend server.

```js
axios.post('http://localhost:3000/', { url })
```

