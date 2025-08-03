const Blog = require('../models/Blog');
const { validationResult } = require('express-validator');

// Create a blog
exports.createBlog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, description, content, tags } = req.body;

  try {
    const blog = new Blog({
      title,
      description,
      content,
      tags,
      author: req.user.id
    });

    await blog.save();

    // Populate author before sending response
    const populatedBlog = await blog.populate('author', 'name email');

    res.status(201).json(populatedBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get blogs (with optional filters, pagination, sorting)
exports.getBlogs = async (req, res) => {
  try {
    const { tag, author, search, sortBy, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (tag) filter.tags = tag.toLowerCase();
    if (author) filter.author = author;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const sortOptions = {};
    sortOptions[sortBy || 'createdAt'] = -1;

    const blogs = await Blog.find(filter)
      .populate('author', 'name email')
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments(filter);

    res.json({ total, page: parseInt(page), limit: parseInt(limit), blogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.author.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    const { title, description, content, tags } = req.body;
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (content) blog.content = content;
    if (tags) blog.tags = tags;

    await blog.save();
    const updatedBlog = await blog.populate('author', 'name email');

    res.json(updatedBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.author.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get blogs by tag
exports.getBlogsByTag = async (req, res) => {
  const tag = req.params.tag;
  try {
    const blogs = await Blog.find({ tags: tag }).populate('author', 'name email');
    res.json({ total: blogs.length, blogs });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Add comment to a blog
exports.addComment = async (req, res) => {
  const blogId = req.params.id;
  const { text } = req.body;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const comment = {
      user: req.user.id,
      text,
      createdAt: new Date()
    };

    blog.comments.push(comment);
    await blog.save();

    res.status(201).json({ message: 'Comment added', comment });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get blogs by author
exports.getBlogsByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;

    const blogs = await Blog.find({ author: authorId }).populate('author', 'name email');

    res.status(200).json({
      total: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error('Error fetching blogs by author:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
