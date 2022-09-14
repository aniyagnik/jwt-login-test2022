
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const path = require("path")
const connectDb = require('./middleware/db');
const userVerify = require('./middleware/userVerify');

connectDb(); 

// middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// middleware for json 
app.use(express.json());

// middleware for cookies
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"build")))

app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'build','index.html'))
})
app.use(function (req,res,next){
    console.log('handling request : ',req.url+" with method "+req.method);
    next();
})

// register route
app.use('/register', require('./routers/registerRouter'));
// login route
app.use('/auth', require('./routers/authRouter'));
// refreshing accessToken through refreshToken
app.use('/refresh', require('./routers/refreshRouter'));

// users accessing routes
app.use('/users', userVerify, require('./routers/apis/usersRouter'));

// connect mongoose and server listening on 8080
const PORT = process.env.PORT || 8080;
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDb');
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
});