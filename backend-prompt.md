# Backend Development Prompt for R-W Restaurant App

## Overview
You need to build a backend API for the R-W Restaurant React frontend application. The backend will be hosted on Render and should support the frontend's authentication and data needs.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Render's managed database)
- **Authentication**: JWT (JSON Web Tokens) for session management
- **CORS**: Enabled for frontend communication
- **Environment**: Production-ready for Render deployment

## Database Schema
Create the following tables in PostgreSQL:

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fname VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Menu Items Table (if needed for dynamic menu)
```sql
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100),
  image_url VARCHAR(500),
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Orders Table (if implementing order system)
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  items JSONB NOT NULL, -- Store cart items as JSON
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/signup
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "fname": "John Doe"
  }
  ```
- **Response (Success)**:
  ```json
  {
    "message": "User created successfully",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "fname": "John Doe"
    }
  }
  ```
- **Response (Error)**:
  ```json
  {
    "error": "Email already exists"
  }
  ```
- **Status Codes**: 201 (Created), 400 (Bad Request), 409 (Conflict)

#### POST /api/auth/login
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response (Success)**:
  ```json
  {
    "message": "Login successful",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "fname": "John Doe"
    },
    "token": "jwt_token_here"
  }
  ```
- **Response (Error)**:
  ```json
  {
    "error": "Invalid email or password"
  }
  ```
- **Status Codes**: 200 (OK), 401 (Unauthorized)

#### POST /api/auth/logout (Optional)
- **Headers**: Authorization: Bearer <token>
- **Response**:
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### Menu Endpoints (if implementing dynamic menu)

#### GET /api/menu
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "Burger",
      "description": "Delicious beef burger",
      "price": 12.99,
      "category": "Main Course",
      "image_url": "https://...",
      "available": true
    }
  ]
  ```

#### GET /api/menu/:category
- **Response**: Filtered menu items by category

### Order Endpoints (if implementing cart/checkout)

#### POST /api/orders
- **Headers**: Authorization: Bearer <token>
- **Request Body**:
  ```json
  {
    "items": [
      {"id": 1, "name": "Burger", "price": 12.99, "quantity": 2}
    ],
    "total": 25.98
  }
  ```
- **Response**:
  ```json
  {
    "message": "Order placed successfully",
    "order_id": 123
  }
  ```

#### GET /api/orders
- **Headers**: Authorization: Bearer <token>
- **Response**: User's order history

## Security Requirements
- Password hashing with bcrypt
- JWT token validation for protected routes
- Input validation and sanitization
- Rate limiting for auth endpoints
- HTTPS enforcement (handled by Render)

## Environment Variables
Create a `.env` file with:
```
DATABASE_URL=postgresql://...
JWT_SECRET=your_jwt_secret
PORT=3001
NODE_ENV=production
```

## Deployment on Render
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables
4. Add a PostgreSQL database instance
5. Configure build and start commands:
   - Build Command: `npm install`
   - Start Command: `npm start`

## Project Structure
```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── menuController.js
│   │   └── orderController.js
├── models/
│   ├── User.js
│   ├── MenuItem.js
│   └── Order.js
├── middleware/
│   ├── auth.js
│   └── validation.js
├── routes/
│   ├── auth.js
│   ├── menu.js
│   └── orders.js
├── config/
│   └── database.js
├── app.js
├── server.js
└── package.json
```

## Dependencies
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "pg": "^8.11.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express-rate-limit": "^6.7.0",
    "helmet": "^6.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

## Testing
- Test all endpoints with Postman or similar
- Verify database connections
- Test authentication flow
- Ensure CORS is working for frontend

## Frontend Integration
Update the frontend to use the new API endpoints:
- Change fetch URLs from `http://localhost:5000` to your Render backend URL
- Handle JWT tokens for authenticated requests
- Update error handling for new response formats

## Next Steps
1. Initialize the backend project
2. Set up database and models
3. Implement authentication endpoints
4. Add menu and order endpoints as needed
5. Test thoroughly
6. Deploy to Render
7. Update frontend with production API URLs