# 🎮 PixelPlay

## Overview

**PixelPlay** is a full-stack web application that allows users to browse, search, and filter a catalog of video games based on their preferences. Users can view detailed information about each game, save games to a personalized wishlist ("Pixel Shelf"), and explore both curated and dynamically fetched content using the RAWG API.

The platform includes an **admin dashboard** for managing internal game listings through secure CRUD operations. PixelPlay is built with a clean, scalable full-stack architecture, showcasing practical, job-ready skills across frontend, backend, database, and third-party API integration.

## 🧠 Problem Space

Gamers often face disjointed or overwhelming experiences when browsing video games online. Platforms typically prioritize sales over discovery, making it hard for users to track games they're interested in.

**PixelPlay solves this by:**

- ✅ Centralizing curated and external game data for a smoother browsing experience.
- 🔍 Introducing search and filtering features to help users easily find games.
- 💾 Allowing users to save favorite games to a personalized wishlist (Pixel Shelf).
- 🔐 Empowering admins to manage internal catalog without needing direct database access.

## 👤 User Profiles

### 🎮 General Users:

- Browse and explore games from both curated and external sources.
- Search by title and filter by genre or rating.
- View game details on a dedicated page.
- Add/remove favorite games to/from Pixel Shelf (wishlist).

### 🛠️ Admin:

- Secure login via JWT-based authentication.
- Manage internal game listings through a custom dashboard.
- Perform full CRUD operations on games stored in Supabase.

## 🎯 Features

### Core Features:

- ➤ Browse Game Catalog (Supabase + RAWG API)
- ➤ Search & Filter by Genre, Rating, Name
- ➤ Game Details Page
- ➤ Pixel Shelf (Wishlist) with Add & Remove functionality
- ➤ Admin Dashboard (Add/Edit/Delete Games)
- ➤ RAWG API Integration (Popular/Trending Games)
- ➤ Mobile-First Responsive Layout
- ➤ Toast Notifications for Feedback

## 🛠️ Implementation

### Tech Stack

- **Frontend**: React, SASS, Formik, React Icons, Toastify, Axios
- **Backend**: Node.js, Express.js, JWT Auth
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT-based (Admin Only)
- **External API**: [RAWG Video Game API](https://rawg.io/apidocs)
- **Deployment**: Vercel (Frontend), Render (Backend)
- **Dev Tools**: GitHub, ESLint, Postman, VSCode, Zsh, Canva, FreePik, Obsidian

## 🌐 APIs

- **Supabase API** – Internal curated game catalog (Admin CRUD).
- **RAWG API** – Dynamic fetch for trending/popular games.

## 🗺️ Sitemap

- `/` → Home page with hero banner and game listings (Supabase + RAWG)
- `/search` → Search results and filter controls
- `/game/:id` → Game details view
- `/admin/login` → Admin login
- `/admin/dashboard` → Admin dashboard (CRUD)
- `/wishlist` → Pixel Shelf (wishlist)

## 📡 Endpoints

### Admin Endpoints (Protected)

- `POST /api/games` → Add new game
- `GET /api/games/:id` → Get game by ID
- `PUT /api/games/:id` → Update game
- `DELETE /api/games/:id` → Delete game

### Public Endpoints

- `GET /api/games` → Get all internal games
- `GET /api/games/search` → Search/filter internal games
- `GET /api/rawg/trending` → Get external RAWG data (popular games)

### Wishlist (Pixel Shelf)

- Local storage used for add/remove wishlist functionality (client-only persistence)

## 📋 Roadmap

### Sprint 1 (March 24–28) – Setup & Admin Features

- Set up GitHub repo and file structure
- Initialize React, Node/Express, Supabase schema
- Create game table and seed data
- Build Admin Dashboard UI
- Implement CRUD (add/edit/delete games)
- Implement JWT-based admin login

### Sprint 2 (March 29–April 2) – User Feature

- Build home page with catalog view + hero banner
- Integrate RAWG API (popular games)
- Add search + filter functionality
- Build Game Details Page
- Implement Pixel Shelf (wishlist)
- Style entire frontend using SASS

### Sprint 3 (April 3–6) – Polish & Deploy

- Final UI polish and bug fixes
- Responsive design adjustments (mobile-first)
- Deploy backend (Render)
- Deploy frontend (Vercel)
- Prepare demo flow for presentation
- Write clean README and documentation

## 📬 Contact & Socials

Built by Samrit Basnet

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/samrit-basnet/)  
[![GitHub](https://img.shields.io/badge/-GitHub-171515?style=flat&logo=github&logoColor=white)](https://github.com/samritbasnet)

## 🚀 Future Implementation

## User Experience Enhancements

User account creation and persistent profiles
Social features (friend connections, game recommendations)
Personalized game recommendations based on browsing history
Game review and rating system
Advanced filtering options (price range, release date, platform)

## Technical Enhancements

Server-side game wishlist storage (replacing localStorage)
Real-time notification system for game releases and price drops
Performance optimization for faster game catalog loading
Cart functionality for payment

## Admin Features

Enhanced analytics dashboard for game engagement metrics
User management system
Login for user accounts as well

---

©Samrit Basnet PixelPlay 2025 – All rights reserved.
