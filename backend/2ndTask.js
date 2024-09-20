const express = require('express');
const app = express();
const cors = require("cors")
const port = 3009;

app.use(express.json())
app.use(cors())

app.get('/users', (req, res) => {
    const users = [
        { name: 'rohit', email: 'rohit@example.com', age: 30 },
        { name: 'mukesh', email: 'mukesh@example.com', age: 25 }
    ];
    res.json(users);
});

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
