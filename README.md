# User Authentication and Authorization

This application provides a simple user authentication system built using **Express**, **Mongoose**, **Argon2** for password hashing, **JWT** (JSON Web Token) for authorization, and **Nodemon** for automatic reloading during development.

The API allows users to sign up, log in, and authenticate their requests using a bearer token. It stores passwords in a securely hashed format using Argon2.

## Features

- **Sign Up**: Users can sign up with `username`, `email`, `password`, `phoneNumber`, and `age`. Passwords are hashed using Argon2.
- **Sign In**: Users can log in using their `email` and `username`. Upon successful login, a JWT token is issued.
- **Token-based Authentication**: After logging in, users must provide the JWT token in the `Authorization` header (Bearer token) to access protected routes.
- **Password Hashing**: Passwords are securely stored in a hashed format using the Argon2 hashing algorithm.

## Packages Used

- **express**: Web framework for Node.js.
- **argon2**: Password hashing library.
- **mongoose**: MongoDB object modeling tool.
- **dotenv**: Loads environment variables from a `.env` file.
- **jsonwebtoken (JWT)**: For token-based authentication.
- **nodemon**: For auto-reloading the server during development.

## API Endpoints

### 1. **Sign Up**

- **URL**: `/usr/signup`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "username": "user1",
    "email": "user1@example.com",
    "password": "password123",
    "phoneNumber": 1234567890,
    "age": 25
  }
  ```

- **Response**:

  ```json
  {
    "message": "Sign up successfully!"
  }
  ```

  This endpoint creates a new user and hashes their password before storing it in the database.

### 2. **Sign In**

- **URL**: `/usr/signin`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "email": "user1@example.com",
    "username": "user1"
  }
  ```

- **Response**:

  ```json
  {
    "message": "Sign in successfully!",
    "token": "Bearer <your_jwt_token>"
  }
  ```

  This endpoint allows users to log in using their email and username. If valid, it returns a JWT token which can be used for subsequent authenticated requests.

### 3. **Get All Users (Protected Route)**

- **URL**: `/usr/`
- **Method**: `GET`
- **Headers**:

  ```json
  {
    "token": "Bearer <your_jwt_token>"
  }
  ```

- **Response**:

  ```json
  {
    "message": "Users fetched successfully",
    "users": [
      {
        "username": "user1",
        "email": "user1@example.com",
        "phoneNumber": 1234567890,
        "age": 25
      },
      ...
    ]
  }
  ```

  This route fetches all users from the database. It requires a valid JWT token in the `token` header.

### 4. **Get User by ID (Protected Route)**

- **URL**: `/usr/:id`
- **Method**: `GET`
- **Headers**:

  ```json
  {
    "token": "Bearer <your_jwt_token>"
  }
  ```

- **Response**:

  ```json
  {
    "message": "User fetched successfully",
    "user": {
      "username": "user1",
      "email": "user1@example.com",
      "phoneNumber": 1234567890,
      "age": 25
    }
  }
  ```

  This route fetches a specific user based on the provided `id`. It requires a valid JWT token in the `token` header.

## Middleware

### Token Verification (JWT)

The middleware function `creationGuard` is used to protect routes that require authentication. It verifies the JWT token sent in the `token` header using the secret key from the `.env` file. If the token is valid, the request proceeds; otherwise, an error message is returned.

## Environment Variables

The following environment variables should be defined in the `.env` file:

- `MONGODB_URI`: MongoDB connection string.
- `SECRET_KEY`: Secret key for signing JWT tokens.
- `PORT`: Port for the server to listen on (optional).
- `NODE_ENV` : Environment variable determines the environment in which a Node.js application is running.

## Conclusion

This application provides a simple user authentication system with secure password storage using Argon2 and token-based authentication using JWT. You can extend this application to include more features like password reset, email verification, etc.
