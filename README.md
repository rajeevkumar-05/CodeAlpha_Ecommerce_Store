# CodeAlpha E-commerce Store

A complete **Simple E-commerce Store** built with the **MERN stack** (MongoDB, Express, React, Node.js) as part of the CodeAlpha Full Stack Development internship.

It includes user authentication, product browsing, a shopping cart, checkout and order processing, user order history, and a full admin dashboard for managing products and orders.

---

## Features

**Customer**
- Register and login (JWT + bcrypt)
- Browse products on the home page with search and category filtering
- View product details
- Add / remove items in the shopping cart (persisted in localStorage)
- Checkout with a shipping address and place an order
- View personal order history and status

**Admin**
- Add, edit, and delete products
- View all customer orders
- Update order status (Pending → Processing → Shipped → Delivered / Cancelled)

**Technical**
- Protected routes using JWT middleware
- Admin-only routes using role-based middleware
- Centralized error handling
- Server-trusted pricing and stock management on checkout
- Clean, responsive CSS (no UI framework required)
- Seed script with sample products and demo accounts

---

## Tech Stack

| Layer     | Technology                     |
| --------- | ------------------------------ |
| Frontend  | React.js (Vite), React Router, Axios |
| Backend   | Node.js, Express.js            |
| Database  | MongoDB with Mongoose          |
| Auth      | JWT, bcryptjs                  |
| Styling   | Responsive CSS                 |

---

## Folder Structure

```
CodeAlpha_Ecommerce_Store/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── api/            # Axios instance with JWT interceptor
│   │   ├── components/     # Navbar, ProductCard, route guards
│   │   ├── context/        # Auth & Cart context providers
│   │   ├── pages/          # Home, Cart, Checkout, Login, etc.
│   │   │   └── admin/      # Admin dashboard, product form, orders
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                 # Express backend
│   ├── config/            # Database connection
│   ├── controllers/        # Route logic (auth, products, orders)
│   ├── middleware/         # Auth, admin, error handlers
│   ├── models/             # Mongoose models (User, Product, Order)
│   ├── routes/             # API route definitions
│   ├── utils/              # JWT token helper
│   ├── seed.js             # Sample data seeder
│   ├── server.js           # App entry point
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer
- [MongoDB](https://www.mongodb.com/) running locally, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd CodeAlpha_Ecommerce_Store
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/` (copy from the example):

```bash
cp .env.example .env
```

Fill in the values:

```env
MONGO_URI=mongodb://127.0.0.1:27017/codealpha_ecommerce
JWT_SECRET=replace_this_with_a_long_random_secret
PORT=5000
```

Seed the database with sample products and demo accounts:

```bash
npm run seed
```

Start the backend:

```bash
npm run dev     # with nodemon (auto-reload)
# or
npm start
```

The API runs at `http://localhost:5000`.

### 3. Set up the frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

The app runs at `http://localhost:5173`. The Vite dev server proxies `/api`
requests to the backend automatically, so no extra configuration is needed.

> Optional: copy `client/.env.example` to `client/.env` if you want to point
> the frontend at a different API URL in production.

---

## Demo Accounts

After running `npm run seed`, you can log in with:

| Role  | Email               | Password  |
| ----- | ------------------- | --------- |
| Admin | admin@example.com   | admin123  |
| User  | john@example.com    | john123   |

Admins see an **Admin** link in the navbar that opens the dashboard.

---

## API Reference

Base URL: `http://localhost:5000/api`

### Auth

| Method | Endpoint          | Access  | Description              |
| ------ | ----------------- | ------- | ------------------------ |
| POST   | `/auth/register`  | Public  | Register a new user      |
| POST   | `/auth/login`     | Public  | Login and receive a JWT  |
| GET    | `/auth/profile`   | Private | Get current user profile |

### Products

| Method | Endpoint         | Access       | Description          |
| ------ | ---------------- | ------------ | -------------------- |
| GET    | `/products`      | Public       | List products        |
| GET    | `/products/:id`  | Public       | Get a single product |
| POST   | `/products`      | Admin        | Create a product     |
| PUT    | `/products/:id`  | Admin        | Update a product     |
| DELETE | `/products/:id`  | Admin        | Delete a product     |

### Orders

| Method | Endpoint             | Access  | Description               |
| ------ | -------------------- | ------- | ------------------------- |
| POST   | `/orders`            | Private | Create a new order        |
| GET    | `/orders/my-orders`  | Private | Get the user's orders     |
| GET    | `/orders`            | Admin   | Get all orders            |
| PUT    | `/orders/:id/status` | Admin   | Update an order's status  |

Protected routes require an `Authorization: Bearer <token>` header. The
frontend attaches this automatically via an Axios interceptor.

---

## Data Models

**User** — `name`, `email`, `password` (hashed), `role` (`user` | `admin`)

**Product** — `name`, `description`, `price`, `image`, `category`, `stock`

**Order** — `user`, `products[]` (snapshot of name/price/qty/image),
`totalAmount`, `shippingAddress`, `status`, `createdAt`

---

## Available Scripts

**Server** (`/server`)

| Command        | Description                        |
| -------------- | ---------------------------------- |
| `npm start`    | Start the server                   |
| `npm run dev`  | Start with nodemon (auto-reload)   |
| `npm run seed` | Seed sample data (use `-d` to wipe)|

**Client** (`/client`)

| Command           | Description                 |
| ----------------- | --------------------------- |
| `npm run dev`     | Start the Vite dev server   |
| `npm run build`   | Build for production        |
| `npm run preview` | Preview the production build|

---

## License

MIT — built for the CodeAlpha Full Stack Development internship.
