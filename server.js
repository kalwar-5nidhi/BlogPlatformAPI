// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Blog Platform API!');
});

// API Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);

// Global error handler
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });
