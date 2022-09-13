
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const connectDb = require('./config/db');

connectDb();

// middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// middleware for json 
app.use(express.json());

// register route
app.use('/register', require('./routers/registerRouter'));
//login route
app.use('/auth', require('./routers/authRouter'));

// connect mongoose and server listening on 8080
const PORT = process.env.PORT || 8080;
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDb');
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
});