# College Admission Management System

A full-stack, enterprise-grade College Admission Management System engineered on the MERN stack with a React/Vite frontend and an Express/MongoDB backend. Features purely merit-based allocations.

## Tech Stack
- Frontend: React JS (Vite), Tailwind CSS, React Router, Axios, Context API
- Backend: Express JS, MongoDB, Mongoose, Node.js
- Tools: JSON Web Tokens (JWT), bcryptjs

## Folder Structure
```
\college_admissions_system
├── backend/
│   ├── src/
│   │   ├── config/ (db connection)
│   │   ├── controllers/ (auth, student, admin logic)
│   │   ├── middleware/ (auth, validation, errors)
│   │   ├── models/ (Mongoose schemas)
│   │   ├── routes/ (Express router)
│   │   ├── services/ (Merit Algorithm)
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   ├── main.jsx
    │   └── App.jsx
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## How to run locally

### 1. Database Setup
You must have MongoDB running locally, or replace the `MONGODB_URI` string in `backend/.env` with your remote MongoDB connection string (e.g., from MongoDB Atlas).

### 2. Backend Setup
1. CD into backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Setup variables: rename `backend/.env.example` to `backend/.env`
4. Start development server: `npm run dev`
   *Runs on port 5000*

### 3. Frontend Setup
1. Open a new terminal and CD to frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Run the vite client: `npm run dev`
   *Runs on port 5173*
   *(Make sure to also execute `npm run build` later before deployment!)*

---

## Deployment Steps

### Backend -> Render / Railway
1. Push your code to a GitHub repository.
2. Sign in to Render (or Railway) and create a **New Web Service**.
3. Connect your repository.
4. Set the Root Directory to `backend/`.
5. Set Build Command to `npm install`
6. Set Start Command to `npm start`
7. In the Environment Variables section, add:
   - `PORT=5000`
   - `MONGODB_URI=your_mongo_cloud_atlas_url`
   - `JWT_SECRET=add_a_super_secret_unique_key`
   - `FRONTEND_URL=your_deployed_vercel_url_here`
8. Deploy!

### Frontend -> Vercel / Netlify
1. Sign in to Vercel and create a **New Project**.
2. Import the repository.
3. Edit the settings -> Set Root Directory to `frontend`.
4. Ensure the Framework Preset is set to Vite.
5. In Environment Variables add:
   - `VITE_API_URL=https://your-deployed-backend-url.onrender.com/api`
6. Deploy!
