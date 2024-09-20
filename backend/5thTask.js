const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://l27.0.0.1:27017/blogdb', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String
});

const Post = mongoose.model('Post', postSchema);

// Create a post
app.post('/posts', async (req, res) => {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
});

// Get all posts
app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

// Get a post by ID
app.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) res.json(post);
    else res.status(404).send('Post not found');
});

// Update a post
app.put('/posts/:id', async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
});

// Delete a post
app.delete('/posts/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

app.listen(3009, () => {
    console.log('Blog API listening on port 3000');
});
