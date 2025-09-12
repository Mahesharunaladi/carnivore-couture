# Carnivore Couture

logo.png

Carnivore Couture is an e-commerce platform specializing in premium meat products. This project aims to provide a seamless shopping experience for users looking to purchase high-quality meats online.

## Features

- User authentication (Login, Register)
- Product browsing and search
- Shopping cart functionality
- Order management
- Admin panel for product and user management
- Secure payment processing (placeholder)

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (LTS version recommended)
- npm (Node Package Manager) or Yarn
- Git
- MongoDB (or access to a MongoDB Atlas cluster)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Mahesharunaladi/carnivore-couture.git
    cd carnivore-couture
    ```

2.  **Install frontend dependencies:**

    ```bash
    cd frontend # If your frontend is in a separate directory, otherwise skip this line
    npm install
    ```

3.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

4.  **Configure Environment Variables (Backend):**

    Create a `.env` file in the `backend` directory with the following content:

    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    # Add any other necessary environment variables
    ```

    Replace `your_mongodb_connection_string` with your MongoDB connection URI (e.g., from MongoDB Atlas or your local instance) and `your_jwt_secret` with a strong, random string.

### Running the Development Server

1.  **Start the backend server:**

    ```bash
    cd backend
    npm run start-backend # 
    ```

2.  **Start the frontend development server:**

    ```bash
    cd .. # Go back to the root directory if you were in backend
    npm run dev # Or npm start, depending on your package.json scripts
    ```

    The frontend application should now be running at `http://localhost:5173` (or another port specified by Vite).

## Backend Details

The backend is built with Node.js and Express.js, using MongoDB as the database. Key components include:

-   **`server.js`**: Main entry point for the Express application.
-   **`config/db.js`**: Handles MongoDB connection.
-   **`models/`**: Contains Mongoose schemas for data models (e.g., `user.model.js`).
-   **`controllers/`**: Implements the logic for handling API requests (e.g., `user.controller.js`).
-   **`routes/`**: Defines API endpoints (e.g., `auth.routes.js`).
-   **`middlewares/`**: Custom middleware (e.g., `rateLimiter.js`).

## Deployment

### Build for Production

To create a production-ready build of the frontend:

```bash
npm run build
```

This will generate optimized static assets in the `dist` directory.

### Backend Deployment

For backend deployment, consider platforms like Heroku, Vercel (for serverless functions), AWS EC2, or DigitalOcean. Ensure your environment variables are properly configured on the deployment platform.

## Technologies Used

**Frontend:**

-   React.js
-   Vite
-   CSS

**Backend:**

-   Node.js
-   Express.js
-   MongoDB (Mongoose ODM)
-   bcrypt.js (for password hashing)
-   jsonwebtoken (for authentication)

## License

This project is licensed under the MIT License.

## Acknowledgments

-   Thanks to all contributors and open-source communities for their invaluable resources.

## Contributors

-   Mahesh Arunaladi
    -   GitHub: [https://github.com/Mahesharunaladi](https://github.com/Mahesharunaladi)

