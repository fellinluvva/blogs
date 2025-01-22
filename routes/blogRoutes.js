const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();

router.post('/', async (req, res, next) => {
try {
    const { title, body, author } = req.body;
    const blog = new Blog({ title, body, author });
    await blog.save();
    res.status(201).json(blog);
} catch (err) {
    next(err);
}
});

router.get('/', async (req, res, next) => {
try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
} catch (err) {
    next(err);
}
});

router.get('/:id', async (req, res, next) => {
try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json(blog);
} catch (err) {
    next(err);
}
});

router.put('/:id', async (req, res, next) => {
try {
    const { title, body, author } = req.body;
    const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, body, author },
    { new: true, runValidators: true }
    );
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json(blog);
} catch (err) {
    next(err);
}
});

router.delete('/:id', async (req, res, next) => {
try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json({ message: 'Blog deleted successfully' });
} catch (err) {
    next(err);
}
});

module.exports = router;
