
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const path = require("path")
const cors =require("cors")
const connectDb = require('./middleware/db');
const userVerify = require('./middleware/userVerify');

connectDb(); 
require('dotenv').config()

// middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// middleware for json 
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

app.use(express.static(path.join(__dirname,"build")))

app.use(function (req,res,next){
    console.log('handling request : ',req.url+" with method "+req.method);
    next();
})
const corsOptions ={
    origin:'https://viewnews.herokuapp.com', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
// register route
app.use('/register', require('./routers/registerRouter'));
// login route
app.use('/auth', require('./routers/authRouter'));
// refreshing accessToken through refreshToken
app.use('/refresh', require('./routers/refreshRouter'));

// users accessing routes
app.use('/users', require('./routers/apis/usersRouter'));


app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'build','index.html'))
})

// connect mongoose and server listening on 8080
const PORT = process.env.PORT || 8080;
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDb');
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
});