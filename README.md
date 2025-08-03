# Blog Platform API

A RESTful API for a blogging platform, built with Node.js, Express, and MongoDB. It includes user authentication, blog creation, tagging, commenting, and more.

---

## Features

- User Registration and Login with JWT
- CRUD operations for Blog Posts
- Add and filter by Tags
- Commenting system on blog posts
- Protected routes for authorized users
- Pagination support for blogs
- Deployed with Render

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Token (JWT), bcrypt
- **Deployment**: Render

---

## Project Structure

BlogPlatformAPI/
├── controllers/
│   ├── authController.js
│   ├── blogController.js
│   
│
├── models/
│   ├── User.js
│   ├── Blog.js
│
├── routes/
│   ├── authRoutes.js
│   ├── blogRoutes.js
│   
│
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
│
├── utils/
│   └── validate.js       
│
├── .env
├── .env.example
├── README.md
├── package.json
├── server.js
└── Procfile                   # Optional, for deployment (e.g., on Render)


