# Project Title

**PixelPlay**

## Overview

PixelPlay is a full-stack web application that allows users to browse, search, and filter games based on their preferences. Users can view detailed information about each game by clicking on a game card, which navigates to a dedicated game details page. The platform integrates both custom-curated game data and external game data fetched from the RAWG API, ensuring a rich and dynamic game catalog. Additionally, PixelPlay includes an admin dashboard where administrators can manage the game listings through CRUD operations. This project demonstrates full-stack development skills with a focus on building clean, scalable client and server architecture using practical, job-ready technologies.

### Problem Space

Gamers often face disjointed experiences when browsing video games across various platforms. PixelPlay solves this by providing:

1. A centralized platform to browse and view video game listings.
2. A combination of custom-curated game data (via Supabase) and external game data from the RAWG API to offer users a comprehensive catalog.
3. Admin tools to manage the catalog easily, without manual database intervention.
4. A clean, modern, responsive UI optimized for gamers, reducing friction in browsing and discovery.

### User Profile

**General Users:**

- Gamers who browse/search for games.
- Users who want to view the latest games and detailed information.
- Users can click on a game to view its full details.

**Admin:**

- Admin (you) manages the internal game catalog via a secure dashboard.
- Admin performs CRUD operations to add, edit, or delete games stored in Supabase.
- Admin serves API endpoints that supply game data to the client.

**Special Considerations:**

- Secure, JWT-based admin authentication to prevent unauthorized access.
- Smooth integration of external RAWG API data without exposing API Keys and handling vulnerabilities securely.
- Clean, intuitive, mobile-responsive design with modern gaming aesthetics.

### Features

Core Features:

➸ **Browse Game Catalog (Supabase Data + RAWG API)**  
Users can view all games fetched by admin and dynamically from RAWG API endpoints.

➸ **Search & Filter**  
Search by title, filter by genre and rating.

➸ **Game Details Page**  
Displays detailed game information: title, description, genre, image, ratings, release date.

➸ **Admin Dashboard**  
Secure admin login with JWT authentication.  
Admin CRUD operations to:

- Add new games.
- Edit existing games.
- Delete games (stored in Supabase).

➸ **RAWG API Integration**  
Fetch and display additional external game data (popular/trending games) dynamically.  
Secure API key handling via backend.

## Implementation

### Tech Stack

Frontend: React, SASS  
Backend: Node.js, Express.js  
Database: Supabase  
Authentication: JWT-based admin authentication  
External API: RAWG API  
Deployment: Vercel / Heroku  
Dev Tools: GitHub, ESLint, Postman, VSCode, Zsh

### APIs

- **Supabase API**: Manage internal curated game catalog.
- **RAWG Video Game API**: Fetch external popular/trending game data dynamically.

### Sitemap

## ![PixelPlay SiteMap](./Assets/CapstoneRequiredments/Sitemap.png)

### Mockups

![PixelPlay AdminLogin](./Assets/Prototype/Adminlogin.png)
![PixelPlay Admin Crud](./Assets/Prototype/AdminCrud.png)
![PixelPlay GameDetailsMockup](./Assets/Prototype/GameDetail.png)
![PixelPlay HomePageMockup](./Assets/Prototype/HomePageq.png)

### Data

![PixelPlayData](./Assets/CapstoneRequiredments/Data.png)

- One table: **games**
  - Each game is managed by the Admin (CRUD).
  - Data is served via custom API endpoints.

![PixelPlayEndPointData](./Assets/CapstoneRequiredments/External%20endpointdata.png)
Dynamically fetched; not stored in the database.
Used for listing trending/popular games.
Filtered/sorted client-side (via server-provided secure API).

### Endpoints

![PixelPlayPublicEndPoints](./Assets/CapstoneRequiredments/PublicEndpoints.png)

![PixelPlayAdminEndPoints](./Assets/CapstoneRequiredments/AdminEndpoints.png)

## Roadmap

![PixelPlayRoadmap](./Assets/CapstoneRequiredments/Roadmap.png)

## Future Implementations

1. **User Authentication & Profiles**  
   Implement user signup/login/logout functionality.

2. **Shopping Cart & Checkout System**  
   Introduce a cart system where users can add games and view a checkout summary 

3. **Payment Gateway Integration**  
   Integrate secure payment gateways (Stripe/PayPal) for real transactions.

4. **User Reviews & Ratings**  
   Allow authenticated users to submit reviews and ratings.

5. **Wishlist & Favorites**  
   Allow users to save games to wishlist/favorites.
