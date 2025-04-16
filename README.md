## 🍕 Food App - Fullstack React Native + Node.js Project

A full-stack mobile food ordering app (Under-Construction) built with **React Native** (Expo) for the frontend and **Node.js + Express + Sequelize + SQLite** for the backend. Users can register, log in, and update their profiles, including uploading a photo and managing their disease/allergy records.

---

## 📱 Features

- User authentication (register & login)
- Profile editing (name, email, password, phone)
- Profile picture upload from device gallery
- Manage diseases and allergies (add/remove)
- Clean UI using native components
- Backend API built with Express + Sequelize + SQLite

---

## 📂 Project Structure

```
/LoginApp      → React Native frontend (Expo)
/Backend       → Node.js backend with SQLite DB
```

---

## ⚙️ Backend Setup (Node.js + SQLite)

### 🔧 1. Navigate to the backend folder

```bash
cd Backend
```

### 📦 2. Install dependencies

```bash
npm install express sequelize sqlite3 cors bcryptjs
```

### ▶️ 3. Start the backend server

```bash
node run dev
```

> Optionally use `nodemon` for auto-reloading:

```bash
npm install --save-dev nodemon
npx nodemon run dev
```

The backend will run on:

```
http://localhost:8080
```

---

## 📱 Frontend Setup (React Native + Expo)

### 🔧 1. Navigate to the frontend folder

```bash
cd LoginApp
```

### 📦 2. Install dependencies

```bash
npm install
```

Or if using Expo:

```bash
npm install -g expo-cli
expo install
```

### ▶️ 3. Start the frontend

```bash
npm start
# or
expo start
```

Then scan the QR code using **Expo Go** on your phone.

---

## 🌐 API URL Configuration (`axios.js`)

Update the IP in `axios.js` for physical device testing:

```js
const api = axios.create({
  baseURL: 'http://<YOUR_LOCAL_IP>:8080/api/user', // Replace with your local IP
});
```

---


## 📌 Dependencies Used

### Frontend (React Native / Expo)

- `react-native`
- `expo`
- `axios`
- `expo-image-picker`
- `@react-navigation/native`
- `@expo/vector-icons`

### Backend (Node.js)

- `express`
- `sequelize`
- `sqlite3`
- `body-parser`
- `cors`
- `nodemon` (dev)

---

## 🤝 Contributing

If you'd like to improve this app, feel free to fork it and submit a pull request. Suggestions and feedback are welcome!

---

## 📧 Contact

Created by Muhammad Anas Farooq 
📩 Email: m.anas.farooq@outlook.com

---
