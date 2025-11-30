# ShopHub - Modern E-Commerce Platform

A full-stack e-commerce marketplace built with Next.js and Laravel.

## 🏗️ Project Structure

```
ecommerce-shophub/
├── frontend/          Next.js 16 application
└── backend/           Laravel 12 API
```

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + Framer Motion
- **State:** Zustand
- **Forms:** React Hook Form + Zod

### Backend
- **Framework:** Laravel 12
- **Database:** PostgreSQL + Redis
- **Authentication:** Laravel Sanctum
- **Permissions:** Spatie Laravel Permission
- **Image Processing:** Intervention Image

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ & npm
- PHP 8.2+ & Composer
- PostgreSQL 14+
- Redis (optional, for caching)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

The API will be available at `http://localhost:8000`

## 📚 Features

### Customer Features
- 🛍️ Product browsing with advanced search & filters
- 🛒 Shopping cart management
- 💳 Multiple payment gateways
- 📦 Order tracking
- ⭐ Product reviews & ratings
- ❤️ Wishlist

### Seller Features
- 🏪 Seller dashboard
- 📊 Analytics & reports
- 📦 Product & inventory management
- 🚚 Order fulfillment
- 💰 Revenue tracking

### Admin Features  
- 👥 User & vendor management
- 🎯 Product moderation
- 📈 Platform analytics
- ⚙️ System configuration

## 📖 Documentation

- [Frontend README](./frontend/README.md)
- [Backend API Documentation](./backend/README.md)
- [Implementation Plan](./docs/implementation_plan.md)

## 🤝 Contributing

This is a personal project. Feel free to fork and modify!

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

---

**Built with ❤️ using Next.js & Laravel**
