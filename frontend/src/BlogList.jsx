import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BlogList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const deletePost = (id) => {
        axios.delete(`http://localhost:3000/posts/${id}`)
            .then(() => {
                setPosts(posts.filter(post => post._id !== id));
            })
            .catch(error => console.error('Error deleting post:', error));
    };

    return (
        <div>
            <h1>Blog Posts</h1>
            <Link to="/create">Create New Post</Link>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <p><strong>Author:</strong> {post.author}</p>
                        <Link to={`/edit/${post._id}`}>Edit</Link>
                        <button onClick={() => deletePost(post._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BlogList;
