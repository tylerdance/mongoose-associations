require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const BlogPost = require('./models/blog.js');

// Connect to database
mongoose.connect(`mongodb://localhost/mongooseAssociation`)

const db = mongoose.connection;
// console.log(db);

db.once('open', () => {
    console.log(`Connected to MongoDB on ${db.host}:${db.port}`);
})

db.on('error', (err) => {
    console.log(`Error`, err);
})

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('yuh')
})

app.get('/blog', (req, res) => {
    BlogPost.create({ 
        title: 'Mongoose', 
        body: 'Cool blog post',
    })

    // Another way to create post and save to db
    const post1 = new BlogPost({
        title: 'SEI 1019',
        body: 'software engineering'
    })
    post1.save();
    res.send('Post completed');
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
})