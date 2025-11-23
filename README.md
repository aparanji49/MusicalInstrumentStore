# MusicalInstrumentStore
A full-stack e-commerce web application for browsing musical instruments, managing a cart, signing in with Google, completing secure Stripe payments and with lightweight AI-powered product suggestions generated using OpenAI.

**Live Demo:** https://musical-instrument-store.vercel.app/  
**Stack:** React, Vite, TypeScript, Redux Toolkit, TailwindCSS, Node.js, Express, GraphQL, MongoDB, Stripe, Google OAuth, OpenAI
**Figma:** https://www.figma.com/design/9DBGg9WqrLet1KMu1c2nl2/MusicalInstrumentStore?node-id=0-1&t=Is7fH2M8o8JCQe41-1
---

## Features

### Core Shopping Flow
- Display a list of musical instruments on the home page  
- Add/remove items from cart  
- Adjust quantities  
- View cart summary and total cost  
- Checkout securely with Stripe

### Authentication
- Google OAuth 2.0 login (Passport)  
- Cookie-based sessions  
- Protected routes on the backend

### AI-Powered Suggestions
- OpenAI API generates simple product suggestions  
- Based on instrument category & price context

### Architecture
- Fully typed **TypeScript** (frontend & backend)  
- GraphQL API (Apollo Server + Express)  
- Redux Toolkit for global state  
- TailwindCSS for responsive styling  
- MongoDB Atlas for production  
- Dockerized MongoDB for local development

---
## Project Structure
```
root
├── frontend/ # React + Vite application
│ ├── src/
│ ├── public/
│ └── package.json
│
└── backend/ # Express + GraphQL API
├── src/
├── dist/
└── package.json
```
---

## Getting Started (Local Development)

### 1️⃣ Clone the repository
```
git clone <repo-url>
cd musical-instrument-store
```
### 2️⃣ Start MongoDB locally (Docker)
```
docker run -d \
  --name mis-mongo \
  -p 27017:27017 \
  -v mis-data:/data/db \
  mongo
  ```
Or use MongoDB Atlas for development.

### 3️⃣ Environment Variables
Backend (backend/.env)
```
MONGO_URI=mongodb://localhost:27017/mis
GOOGLE_CLIENT_ID=xxxx
GOOGLE_CLIENT_SECRET=xxxx
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback
SESSION_SECRET=xxxx
STRIPE_SECRET_KEY=xxxx
OPENAI_API_KEY=xxxx
CLIENT_URL=http://localhost:5173
```
Frontend (frontend/.env)
```
VITE_API_URL=http://localhost:4000
VITE_STRIPE_PUBLIC_KEY=xxxx
```
### 4️⃣ Install & Run
Frontend
```
cd frontend
npm install
npm run dev
```
Backend
```
cd backend
npm install
npm run dev
```

Frontend → `http://localhost:5173`
Backend → `http://localhost:4000`

---

## Deployment

**Frontend:** Vercel
**Backend:** Render
**Database:** MongoDB Atlas
**OAuth:** Google Cloud Console
**Payments:** Stripe Dashboard

---

## Current Limitations

- This project does NOT currently include:
- Individual product detail pages
- Category-based browsing
- Advanced search or filtering
- Admin dashboard
- User profiles or order history

---

## Future Improvements

- Product detail pages
- Categories & filtering
- Inventory management (admin UI)
- Order history for users
- Search bar with suggestions
- Improved AI recommendation module
