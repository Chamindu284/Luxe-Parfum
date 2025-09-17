# Perfume E‑Commerce (Full Stack)

Monorepo with backend (Node/Express/MongoDB Atlas) and frontend (React + Vite, Tailwind, Redux Toolkit).

## Prerequisites

- Node.js 18+
- MongoDB Atlas cluster (connection string)

## Backend

1. Create `backend/.env` based on the example:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<dbName>?retryWrites=true&w=majority
JWT_SECRET=supersecretjwt
```

2. Install and run:

```
cd backend
npm install
npm run dev
```

3. Seed sample products (optional):

```
npm run seed
```

## Frontend

1. Create `frontend/.env` (optional) to override API base:

```
VITE_API_BASE=http://localhost:5000/api
```

2. Install and run:

```
cd frontend
npm install
npm run dev
```

3. Open the URL printed by Vite (e.g., http://localhost:5173).

## Features

- Products listing with filters (keyword, category, price range)
- Product details page
- Cart with persistent local storage
- Checkout creates order (mock payment); order history and user dashboard
- Auth with JWT (register/login) and protected routes

## Notes

- For production, set secure JWT secret and configure CORS accordingly.
- Add admin endpoints to manage products if needed.
