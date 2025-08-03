// seed.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Blog = require('./models/Blog');
require('dotenv').config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await User.deleteMany({});
    await Blog.deleteMany({});

    const passwordHash = await bcrypt.hash('password123', 10);
    const user = new User({ name: 'Demo User', email: 'demo@example.com', password: passwordHash });
    await user.save();

    const blogs = [
      {
        title: 'Welcome Post',
        description: 'This is the welcome post description.',
        content: 'Welcome to our blog platform!',
        author: user._id,
        tags: ['welcome', 'intro'],
      },
      {
        title: 'Second Post',
        description: 'Another blog post description.',
        content: 'More content here.',
        author: user._id,
        tags: ['news'],
      },
    ];
    await Blog.insertMany(blogs);
    console.log('Seed data inserted');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

seed();
