# Carnivore Couture

**A premium e-commerce platform for high-quality meat delivery.**

![React Badge](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js Badge](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB Badge](https://img.shields.io/badge/MongoDB-4.4-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite Badge](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Key Features Implemented](#key-features-implemented)
- [Project Structure](#project-structure)
- [Installation & Setup Instructions](#installation--setup-instructions)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)
- [Future Features](#future-features)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
Carnivore Couture is a modern, full-stack e-commerce application designed for a premium meat delivery service. Users can seamlessly browse a selection of high-quality meat products, manage their shopping cart, and securely authenticate to access personalized features. The platform emphasizes a smooth user experience with a responsive design and robust backend functionality.

## Tech Stack

**Frontend:**
- **React 18**: A declarative, component-based JavaScript library for building user interfaces.
- **Vite**: A fast build tool that provides an instant development server and bundles your code for production.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **React Context API**: For efficient global state management (AuthContext, CartContext).

**Backend:**
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.

**Database:**
- **MongoDB**: A NoSQL document database for flexible and scalable data storage.
- **Mongoose**: An elegant MongoDB object modeling tool for Node.js.

**Authentication:**
- **JWT (JSON Web Tokens)**: For secure, stateless authentication.

**Other:**
- **Deployment Ready**: Configured with Vite proxy for development and CORS enabled for seamless cross-origin requests.

## Key Features Implemented
- **User Authentication**: Secure user registration and login with password hashing using `bcrypt`.
- **Persistent Shopping Cart**: Users can add, remove, and update quantities of items in their cart, with data saved per user in MongoDB.
- **Real-time Cart Calculations**: Automatically updates total price as items are added or removed.
- **Protected Routes & API Endpoints**: Ensures only authenticated users can access sensitive data and functionalities.
- **Responsive UI**: A clean, intuitive, and mobile-friendly user interface built with Tailwind CSS.

## Project Structure


## Installation & Setup Instructions

Follow these steps to get Carnivore Couture up and running on your local machine.

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/carnivore-couture.git
    cd carnivore-couture
    ```

2.  **Install Dependencies**
    Install dependencies for both the frontend and backend.
    ```bash
    npm install # Installs dependencies for the root (backend)
    cd client # Navigate to the frontend directory
    npm install # Installs dependencies for the frontend
    cd .. # Navigate back to the root directory
    ```

3.  **Set Up Environment Variables**
    Create a `.env` file in the `server/` directory and another `.env` file in the `client/` directory (if needed for frontend-specific variables). Populate them with your configuration.

    **`server/.env` example:**
    ```
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/carnivore-couture
    JWT_SECRET=your-super-secret-jwt-key
    ```

    **`client/.env` example (for frontend, if needed):**
    ```
    VITE_API_BASE_URL=http://localhost:3000/api
    ```

4.  **Start MongoDB**
    Ensure your MongoDB instance is running. If you're using a local MongoDB, start it. If you're using MongoDB Atlas, ensure your connection string in `MONGO_URI` is correct.

5.  **Run the Application**
    You can run the frontend and backend separately or concurrently.

## Scripts
-   `npm run dev`: Starts the Vite development server for the frontend.
-   `npm run server`: Starts the Express server for the backend.
-   `npm run dev:all`: Runs both concurrently (you might need to install `concurrently` globally or as a dev dependency: `npm install -g concurrently` or `npm install concurrently --save-dev`).

## Environment Variables

**`.env.example` for `server/.env`:**

## Screenshots

*(Optional: Add screenshots here to showcase your application. Replace the placeholders below with actual image links.)*

-   **Login/Register Page**
    ![Login/Register Page Screenshot](link-to-login-register-screenshot.png)

-   **Product Grid**
    ![Product Grid Screenshot](link-to-product-grid-screenshot.png)

-   **Cart with Items**
    ![Cart with Items Screenshot](link-to-cart-screenshot.png)

-   **Mobile View**
    ![Mobile View Screenshot](link-to-mobile-view-screenshot.png)

## Future Features

We have exciting plans for Carnivore Couture, including:
-   **Checkout with Stripe**: Integrate a secure payment gateway for seamless transactions.
-   **Order History**: Allow users to view their past orders.
-   **Admin Dashboard**: A dedicated interface for managing products, users, and orders.
-   **Product Reviews**: Enable customers to leave reviews and ratings for products.
-   **Email Receipts**: Automated email confirmations for purchases.

## Contributing

We welcome contributions to Carnivore Couture! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -m 'Add new feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name`).
5.  Open a Pull Request.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

For any issues or feature requests, please visit the [Issues](https://github.com/your-username/carnivore-couture/issues) page.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.