import React, { useState, useEffect } from 'react';

const UsersTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3009/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UsersTable;
