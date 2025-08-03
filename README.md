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


## Installation & Setup

1. Clone the repo:  
   ```bash
   git clone https://github.com/kalwar-5nidhi/BlogPlatformAPI
   cd BlogPlatformAPI

2. Install dependencies:
   ```bash
   npm install

3. API available at http://localhost:5000

***API Endpoints***

Method	        Endpoint	                 Description
POST	     /api/auth/register	         Register a new user
POST	     /api/auth/login	         Login and obtain JWT token
GET	         /api/blogs	                 List blogs (supports filters, pagination)
POST	     /api/blogs	                 Create a new blog (authenticated)
GET	         /api/blogs/:id	             Get blog post by ID
PUT	         /api/blogs/:id	             Update blog post (authenticated)
DELETE	     /api/blogs/:id	             Delete blog post (authenticated)
POST	     /api/blogs/:id/comments	 Add comment to blog post (authenticated)
GET	         /api/blogs/:id/comments	 Get comments for a blog post

4. Validation & Error Handling
Validates all input data to ensure integrity
Returns appropriate HTTP status codes and messages
Protects sensitive routes with JWT authentication

5. Deployment
The API is deployed on Render and accessible at:
[https://your-service-name.onrender.com](https://blogplatformapi-1.onrender.com)


6. License
This project is licensed under the MIT License.

7. Demo Video
Watch the demo video here: [Google Drive Video]((https://drive.google.com/file/d/1xLOh-9KdiM0Uv3uYI_lXrlr_yMr7dojh/view?usp=drive_link))





