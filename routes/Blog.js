const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

// Fetch all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

// Create a new blog post
router.post('/create-blog', async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const user = await User.findOne({ username: author });
    if (!user) {
      return res.status(400).json({ message: 'Author not found' });
    }

    const newBlog = new Blog({
      title,
      content,
      author: user._id,
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog post created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create blog post. Please try again.' });
  }
});

module.exports = router;
