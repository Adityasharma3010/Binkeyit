# 🛒 Binkeyit — MERN Stack Quick-Commerce App

A full-stack grocery / quick-commerce web application inspired by Blinkit, built with MongoDB, Express, React, and Node.js.

Users can register, verify their account, log in, manage their profile and avatar, and reset a forgotten password with an OTP. Admins get a protected dashboard to manage product categories with image uploads.

> 🚧 **Status: work in progress.** Authentication, profile, role-based access, and category management are working. Product listing, cart, orders, and addresses are scaffolded (routes and pages exist) and are on the roadmap.

[![MERN](https://img.shields.io/badge/Stack-MERN-green)](#)
[![React](https://img.shields.io/badge/Frontend-React%2019-blue)](#)
[![Node](https://img.shields.io/badge/Backend-Node.js-brightgreen)](#)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)](#)
[![Express](https://img.shields.io/badge/API-Express%205-lightgrey)](#)
[![Status](https://img.shields.io/badge/Status-In%20Progress-yellow)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](#)

---

## 🚀 Live Demo

Frontend: [https://binkeyit-three.vercel.app](https://binkeyit-three.vercel.app)

---

## ✨ Features

- 🔐 User registration, login, and logout
- 📧 Email delivery via Resend (verification and password-reset emails)
- 🔑 Secure password hashing with bcrypt
- 🎟️ JWT authentication — short-lived access token + refresh token stored in httpOnly cookies
- ♻️ Automatic access-token refresh (Axios interceptor)
- 🔁 Forgot password flow with OTP verification
- 👤 Profile page — update details, upload / remove avatar
- 🛡️ Role-based access (`USER` / `ADMIN`) with an admin-only route guard
- 🗂️ Category management for admins — add, edit, delete, with image upload
- ☁️ Image uploads to Cloudinary (multer in-memory upload)
- 🔔 Toast notifications
- 📱 Responsive header, search bar, and mobile user menu
- 🧰 Global user state with Redux Toolkit

---

## 🏗️ Tech Stack

### Frontend

- React 19 (Vite 7)
- React Router 7
- Redux Toolkit / React Redux
- Tailwind CSS 4
- Axios
- React Hot Toast
- React Icons
- React Type Animation

### Backend

- Node.js (ES Modules)
- Express 5
- MongoDB + Mongoose
- JSON Web Tokens (jsonwebtoken)
- bcryptjs
- Cloudinary + multer
- Resend (transactional email)
- helmet, cors, cookie-parser, morgan
- dotenv, nodemon

---

## 📂 Folder Structure

```
📦 Binkeyit
┣ 📂 client/
┃ ┣ 📂 public/
┃ ┣ 📂 src/
┃ ┃ ┣ 📂 common/        # SummaryApi.js — all API endpoints in one place
┃ ┃ ┣ 📂 components/    # Header, Search, UserMenu, modals, etc.
┃ ┃ ┣ 📂 hooks/         # useClickOutside, useMobile
┃ ┃ ┣ 📂 layouts/       # Dashboard, AdminPermission (route guard)
┃ ┃ ┣ 📂 pages/         # Home, Login, Register, Profile, CategoryPage, ...
┃ ┃ ┣ 📂 route/         # React Router config
┃ ┃ ┣ 📂 store/         # Redux store + userSlice
┃ ┃ ┣ 📂 utils/         # Axios instance, helpers
┃ ┃ ┣ 📜 App.jsx
┃ ┃ ┗ 📜 main.jsx
┃ ┣ 📜 vite.config.js  # Dev proxy: /api -> http://localhost:8080
┃ ┗ 📜 package.json
┣ 📂 server/
┃ ┣ 📂 config/          # MongoDB connection, email (Resend)
┃ ┣ 📂 controllers/     # user, category, uploadImage
┃ ┣ 📂 middleware/      # auth (JWT), multer
┃ ┣ 📂 models/          # user, category, subCategory, product, cartProduct, order, address
┃ ┣ 📂 route/           # user, category, upload routes
┃ ┣ 📂 utils/           # token generators, OTP, email templates, Cloudinary helper
┃ ┣ 📜 index.js         # Express server entry
┃ ┗ 📜 .env             # Environment variables (not committed)
┗ 📜 README.md
```

---

## ⚙️ Environment Variables

Create `server/.env`:

```
PORT=8080
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173

SECRET_KEY_ACCESS_TOKEN=your_access_token_secret
SECRET_KEY_REFRESH_TOKEN=your_refresh_token_secret

RESEND_API=your_resend_api_key

CLODINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLODINARY_API_KEY=your_cloudinary_api_key
CLODINARY_API_SECRET_KEY=your_cloudinary_api_secret
```

> The `CLODINARY_*` spelling is intentional — it matches the variable names used in the code.

⚠️ Never commit real credentials.

The client needs no `.env` in development — Vite proxies `/api` requests to `http://localhost:8080`.

---

## 🛠️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/Adityasharma3010/Binkeyit.git
cd Binkeyit
```

Backend setup:

```bash
cd server
npm install
npm run dev
```

Server runs at: `http://localhost:8080`

Frontend setup (in a second terminal):

```bash
cd client
npm install
npm run dev
```

App runs at: `http://localhost:5173`

---

## 🔌 API Endpoints

### User Routes — `/api/user`

| Method | Endpoint                      | Auth | Description                       |
| ------ | ----------------------------- | ---- | --------------------------------- |
| POST   | `/register`                   | —    | Register a new user               |
| POST   | `/verify-email`               | —    | Verify email address              |
| POST   | `/login`                      | —    | Log in                            |
| GET    | `/logout`                     | ✅   | Log out                           |
| GET    | `/user-details`               | ✅   | Get the logged-in user's details  |
| PUT    | `/update-user`                | ✅   | Update profile details            |
| PUT    | `/upload-avatar`              | ✅   | Upload avatar image               |
| PUT    | `/clear-avatar`               | ✅   | Remove avatar                     |
| PUT    | `/forgot-password`            | —    | Send password-reset OTP           |
| PUT    | `/verify-forgot-password-otp` | —    | Verify the OTP                    |
| PUT    | `/reset-password`             | —    | Set a new password                |
| POST   | `/refresh-token`              | —    | Get a new access token            |

### Category Routes — `/api/category`

| Method | Endpoint        | Auth | Description          |
| ------ | --------------- | ---- | -------------------- |
| POST   | `/add=category` | ✅   | Add a category       |
| GET    | `/get`          | —    | Get all categories   |
| PUT    | `/update`       | ✅   | Update a category    |
| DELETE | `/delete`       | ✅   | Delete a category    |

### File Routes — `/api/file`

| Method | Endpoint  | Auth | Description                          |
| ------ | --------- | ---- | ------------------------------------ |
| POST   | `/upload` | ✅   | Upload an image to Cloudinary        |

---

## 🔐 Authentication Flow

1. User registers — password is hashed with bcrypt and a verification email is sent
2. User logs in — server issues an access token (5 hours) and a refresh token (7 days)
3. Both tokens are set as `httpOnly`, `secure` cookies; the access token is also kept in `localStorage` and sent as a `Bearer` header
4. When the access token expires, the Axios interceptor calls `/refresh-token` and retries the request
5. Admin-only pages are wrapped in `AdminPermission`, which checks the user's `role`

Forgot password: enter email → receive OTP → verify OTP → set new password.

---

## 🧪 Testing

Use:

- Postman
- Thunder Client
- Browser DevTools

Test the register / login / category APIs. To try admin features, set a user's `role` to `ADMIN` directly in MongoDB.

---

## 🚀 Deployment

Backend — Render / Railway (any Node host)

1. Connect the GitHub repo and set the root directory to `server`
2. Add all environment variables from above (set `FRONTEND_URL` to your deployed frontend URL)
3. Start command: `npm start`

Frontend — Vercel / Netlify

1. Set the root directory to `client`
2. Build command: `npm run build`, output directory: `dist`
3. Point `/api` at your deployed backend — either add a rewrite/proxy rule for `/api/*`, or set `baseURL` in `client/src/common/SummaryApi.js` to your backend URL (it is empty by default, which only works with the dev proxy)

Because cookies are `secure` + `SameSite=None`, the backend must be served over HTTPS.

---

## 🧠 Future Improvements

- Product upload and product admin pages
- Sub-category management
- Product listing, search, and filters
- Shopping cart
- Address book
- Checkout, orders, and order history
- Payment integration
- Client-side email verification page
- Admin dashboard
- Unit and integration tests

---

## 🤝 Contributing

Fork → Create branch → Commit → Pull Request

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Aditya Sharma  
Website: [https://adityasharma.site](https://adityasharma.site)

---

⭐ If you like this project, please give it a star!
