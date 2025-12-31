# R-W Restaurant Backend

This is the backend API for the R-W Restaurant React frontend application.

## Setup

1. Ensure XAMPP is installed and MySQL is running.
2. Create a database named `restaurant_db` in phpMyAdmin (http://localhost/phpmyadmin).
3. Run the `init.sql` script in phpMyAdmin to create the tables.
4. Clone the repository.
5. Run `npm install` to install dependencies.
6. Create a `.env` file with the following variables:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=restaurant_db
   JWT_SECRET=your_jwt_secret
   PORT=3001
   NODE_ENV=development
   ```
7. Run `npm start` to start the server.

## API Endpoints

### Authentication
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/logout

### Menu
- GET /api/menu
- GET /api/menu/:category

### Orders
- POST /api/orders (requires auth)
- GET /api/orders (requires auth)

## Deployment

For production, update the database configuration for your MySQL server and deploy accordingly.