const express = require('express');

const cors = require("cors");
const mongoose = require("mongoose")

const app = express();
app.use(express.json())
app.use(cors())


const port = 3009;

mongoose.connect('mongodb://127.0.0.1:27017/merntask', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

app.get('/user/:email', async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

app.post('/user', async (req, res) => {
    try {
        // Destructure name, email, and age from the request body
        const { name, email, age } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user instance
        const newUser = new User({ name, email, age });

        // Save the user to the database
        await newUser.save();

        // Send success response
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        // Handle errors
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
