### PHASE 1: Project Planning
🧠 1. Tech Stack 

Frontend: React (with Vite) + Tailwind CSS
Backend: Node.js + Express.js
Database: MongoDB (with Mongoose)
Auth: JWT + Role-based (User/Admin)
State Management: Redux Toolkit (industry standard)
Image Upload: Cloudinary (later)
Payment (optional later): Stripe / Razorpay

2. High-Level Features
👤 User Features
Register / Login / Logout
Browse products
Search & filter products
Product details page
Add to cart
Checkout (later)
Order history
Profile management


👑Admin Features
Admin dashboard
Add / Edit / Delete products
Manage users
Manage orders
Upload product images
Analytics (basic)

🔐 Auth System
JWT Authentication
Role-based access:
user
admin
Protected routes (frontend + backend)


### 3. Project Structure (Monorepo Style)
2 folders inside one root
```javascript
ecommerce-mern/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── app/              # Redux store
│   │   ├── features/         # Redux slices
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/         # API calls
│   │   ├── hooks/
│   │   └── main.jsx
│   └── index.html
│
└── README.md
```

4. Backend Architecture

We will follow MVC Pattern:

Model → MongoDB schema
Controller → business logic
Routes → API endpoints
Middleware → auth, error handling

5. API Design (Important)
Auth APIs
```javascript
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
```

Product APIs
```javascript
GET    /api/products
GET    /api/products/:id
POST   /api/products       (admin)
PUT    /api/products/:id   (admin)
DELETE /api/products/:id   (admin)
```

User APIs
```javascript
GET    /api/users        (admin)
DELETE /api/users/:id    (admin)
```

6. Database Design
User Schema
```javascript
name
email
password (hashed)
role (user/admin)
createdAt
```
Product Schema
```javascript
name
description
price
image
category
stock
createdAt
```