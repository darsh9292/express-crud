# Employee management API
Express JS + MongoDB CRUD(Create, Read, Update, Delete) with JWT authentication and file storage on Cloudinary

## Features
- **GET /api/v1/healthcheck**: Health check for backend service
- **POST /api/v1/users/register**: Register new user
- **POST /api/v1/users/login**: Login with already existing user
- **POST /api/v1/users/logout**: Logout user
- **POST /api/v1/users/refresh-token**: Update refresh token
- **POST /api/v1/users/change-password**: Change user password
- **GET /api/v1/users/current-user**: Retrive user details
- **PATCH /api/v1/users/update-account**: Update user details
- **PATCH /api/v1/users/avatar**: Update user avatar

## Technologies Used
- Node.js
- Express.js
- dotenv (for environment variables)
- CORS (for cross-origin resource sharing)
- bcrypt
- cloudinary
- cookie-parser
- jsonwebtoken
- mongoose
- morgan
- multer
- winston

## Getting Started
Follow instructions to setup project on your local machine.

### Prerequisites
Ensure you have the following installed on your local machine:
- Node.js
- npm

### Installation
Clone the repository:

```bash
git clone git@github.com:darsh9292/express-crud.git
```

### Navigate into the project directory:

Install dependencies:

```bash
npm install
```

### Configuration
Create a .env file in the root directory of the project and copy environment variables from .env.sample and update it. Kindly note, this requires cloudinary account and their credentials, which can be created free.

### Running the Application
To run the application locally, use the following command:

```bash
npm run dev
```
This will start the server at http://localhost:3000. Hit http://localhost:3000/api/v1/healthcheck to check whether everything is running properly or not.

## Usage
Once the server is running, you can use the API endpoints to manage employees:

Use tools like Postman or curl to interact with the API endpoints.
Integrate the API with a frontend application for a complete employee management solution.
