# QualityDealings

QualityDealings is a modern, responsive, and robust full-stack e-commerce web application running on Next.js 15+ and the App Router.

## 🚀 Features

- **Storefront**: Browse products, view individual listings, filter via category. Fully optimized with Tailwind CSS v4.
- **Cart & Checkout**: Native shopping cart context managed via React hooks that securely ties directly into an integrated Stripe checkout flow.
- **Authentication**: Custom JWT-based user and admin authentication stored firmly via HTTP-Only active cookies.
- **Order Management**: As a user, view your previous successful purchases and delivery statuses via the dashboard (`/orders`).
- **Admin Dashboard**: Create, update, toggle and manage products directly from a visual interface without ever needing to touch the database console.

## 🛠 Tech Stack

- **Framework**: Next.js (App Router, Server Components + Client Components)
- **Styling**: Tailwind CSS v4, Lucide-React Icons
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT & `bcryptjs`
- **Payments**: Stripe API

## 📋 Prerequisites

To run this project locally, make sure you have installed:
- Node.js (Version 18+)
- Local MongoDB server or [MongoDB Atlas URI](https://www.mongodb.com/atlas/database)
- [Stripe Account](https://dashboard.stripe.com/) for test-mode API keys

## ⚙️ Environment Variables

Create a file named `.env.local` in the root of your project and populate it:

```env
MONGODB_URI=mongodb://localhost:27017/qualitydealings
JWT_SECRET=your_super_secret_jwt_key
STRIPE_SECRET_KEY=sk_test_... (from Stripe Developer Dashboard)
```

## 💻 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```
   *The application will now be running on `http://localhost:3000`.*

3. **Seed the database (Initial Data Setup)**
   Since the database is initially empty, you can seed it by making an HTTP GET request or simply visiting this route in your browser:  
   `http://localhost:3000/api/seed`

   This will generate default dummy categories, electronics, and set up your admin profile automatically.

## 🔑 Default Accounts (from Seeding)

**Admin Account:**
- **Email:** `qualitydealings@yahoo.co.uk`
- **Password:** `12345@Deal`

You can use the admin account by logging in normally at `/login`. Admin pages are isolated within `/admin`.

## 📦 Building for Production

Compile a production build via:
```bash
npm run build
npm run start
```
