import React, { useState } from 'react';

const UserForm = () => {
    const [user, setUser] = useState({ name: '', email: '', age: '' });
    const [submittedUsers, setSubmittedUsers] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3009/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(data => {
                setSubmittedUsers([...submittedUsers, data]);
                setUser({ name: '', email: '', age: '' });
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="name" value={user.name} onChange={handleChange} placeholder="Name" />
                <input name="email" value={user.email} onChange={handleChange} placeholder="Email" />
                <input name="age" value={user.age} onChange={handleChange} placeholder="Age" />
                <button type="submit">Submit</button>
            </form>

            <ul>
                {submittedUsers.map((user, index) => (
                    <li key={index}>{user.name} - {user.email} - {user.age}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserForm;
