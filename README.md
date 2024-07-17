 # Book Store API

![Node.js](https://img.shields.io/badge/Node.js-v14.17.0-green)
![Express.js](https://img.shields.io/badge/Express.js-v4.19.2-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-v4.4.6-green)
![Mongoose](https://img.shields.io/badge/Mongoose-v8.5.0-orange)
![JWT](https://img.shields.io/badge/JSONWebToken-v9.0.2-blue)
![bcrypt](https://img.shields.io/badge/bcrypt-v5.1.1-red)
![dotenv](https://img.shields.io/badge/dotenv-v16.4.5-yellow)

A robust backend API for managing a book store, built with Node.js, Express.js, and MongoDB.

## Features

- **Connection Management**: MongoDB integration managed in `conn.js` for efficient data handling.
- **Data Models**: Structured models (`book.js`, `order.js`, `user.js`) ensure organized data representation.
- **RESTful API Routes**: Comprehensive routes (`book.js`, `cart.js`, `favourites.js`, `order.js`, `user.js`, `UserAuth.js`) for seamless CRUD operations.
- **Authentication**: Secure user authentication and authorization using JWT in `UserAuth.js`.
- **Environment Management**: Configured with `dotenv` for environment variable management.
- **Automatic Restart**: Utilizes `nodemon` for automatic server restarts during development.

## Prerequisites

- Node.js v14.17.0 or higher
- MongoDB v4.4.6 or higher

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/book-store-api.git

2. Install dependencies:

   ```bash
   cd book-store-api
   npm install

3. Set up environment variables:

   - Create a .env file in root directory
   - Define environment variables
   
   ```bash
   PORT=your_localhost_port_number
   URI=your_mongodb_connection_string
   TOKEN=your_jwt_secret_key

4. Run the server

   ```bash
   npm start

## API Endpoints

- POST api/v1/sign-up : New user registration.
- POST api/v1/sign-in : Existing user login.
- GET api/v1/user-info : Retrieve user info.
- PUT api/v1/update-address : Update user address.
- POST api/v1/place-order : Order books.
- GET api/v1/get-order-history : Get order history.
- GET api/get-all-orders : Get all users order(Admin).
- GET api/v1/update-order-status/:id : Update order status(Admin).
- PUT api/v1/add-to-fav : Add books to favourites.
- PUT api/v1/remove-from-fav : Remove books from favourites.
- GET api/v1/get-fav-user  : Get favourites.
- PUT api/v1/add-to-cart : Add books to cart.
- PUT api/v1/remove-from-cart/:bookid : Remove books from cart
- GET api/v1/get-cart-user : Get all books in cart.
- POST api/v1/add-book :  Add books to database(Admin).
- PUT api/v1/update-book : Update books info in database(Admin).
- DELETE api/v1/delete-book : Delete book from database(Admin).
- GET api/v1/get-books : Get all the books in database(Admin).
- GET api/v1/get-recent-books : Get recent books from database(Admin).

## Contributing

Contributions are welcome! , please follow these steps :

1. Fork the repository.
2. Create a new branch (git checkout -b feature/new-feature).
3. Make your changes.
4. Commit your changes (git commit -am 'Add new feature').
5. Push to the branch (git push origin feature/new-feature).
6. Create a new Pull Request.

## Acknowledgements

- Express.js: Fast, unopinionated, minimalist web framework for Node.js.
- Mongoose: Elegant MongoDB object modeling for Node.js.
- bcrypt/bcryptjs: Password hashing libraries for secure authentication.
- dotenv: Zero-dependency module for loading environment variables.
- jsonwebtoken: Implementation of JSON Web Tokens for secure communication.


