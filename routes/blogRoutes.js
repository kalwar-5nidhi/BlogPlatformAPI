const express = require('express');
const blogController = require('../controllers/blogController');
const auth = require('../middlewares/auth');
const { validateRequest } = require('../utils/validate');

// Import validators
const {
  createBlogValidator,
  updateBlogValidator
} = require('../validators/blogValidators');

const {
  addCommentValidator
} = require('../validators/commentValidators');

const router = express.Router();

// GET all blogs with optional filters like pagination
router.get('/', blogController.getBlogs);

// GET blogs by tag (placed before `/:id` to avoid conflict)
router.get('/tag/:tag', blogController.getBlogsByTag);

// GET blogs by author (placed before `/:id` to avoid conflict)
router.get('/author/:authorId', blogController.getBlogsByAuthor);

// GET single blog by ID
router.get('/:id', blogController.getBlogById);

// Create blog
router.post(
  '/',
  auth,
  createBlogValidator,
  validateRequest,
  blogController.createBlog
);

// Update blog
router.put(
  '/:id',
  auth,
  updateBlogValidator,
  validateRequest,
  blogController.updateBlog
);

// Delete blog
router.delete('/:id', auth, blogController.deleteBlog);

// Add comment
router.post(
  '/:id/comments',
  auth,
  addCommentValidator,
  validateRequest,
  blogController.addComment
);

module.exports = router;
