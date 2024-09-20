import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BlogForm() {
    const [post, setPost] = useState({ title: '', content: '', author: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3009/posts/${id}`)
                .then(response => setPost(response.data))
                .catch(error => console.error('Error fetching post:', error));
        }
    }, [id]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            // Update existing post
            axios.put(`http://localhost:3009/posts/${id}`, post)
                .then(() => navigate('/'))
                .catch(error => console.error('Error updating post:', error));
        } else {
            // Create new post
            axios.post('http://localhost:3009/posts', post)
                .then(() => navigate('/'))
                .catch(error => console.error('Error creating post:', error));
        }
    };

    return (
        <div>
            <h1>{id ? 'Edit Post' : 'Create New Post'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Content</label>
                    <textarea
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Author</label>
                    <input
                        type="text"
                        name="author"
                        value={post.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{id ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
}

export default BlogForm;
