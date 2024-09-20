const express = require('express');
const app = express();
const cors = require("cors")
const port = 3009;

app.use(express.json())
app.use(cors())

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

const insertUser = async () => {
    const newUser = new User({
        name: 'rohit',
        email: 'rohit.com',
        age: 30
    });

    await newUser.save();
    console.log('User inserted');
};

mongoose.connect('mongodb://127.0.0.1:27017/merntask', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        insertUser();
    })
    .catch(err => console.log(err));
