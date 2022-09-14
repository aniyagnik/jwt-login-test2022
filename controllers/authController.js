const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const ACCESS_TOKEN_SECRET="20b5b6beb948a53eac1a24f266a6437e9e16dad8ca9ff5555bddc1ee7830253d98adb8c2142cb259c28d6a12acf8c82c4d7252fd70bb5c6bb832dab4639d30bf"
    const REFRESH_TOKEN_SECRET="73a933103b94927d7713189fa2e0dadeaa8ec34205fa2e9897b752d171ebf600b011055df1442102e7a4c54bc8460b4f665d8dd038ea31b01267b744f8c14c72"
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    // CHECKING IF USER EXISTS
    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) return res.status(404).json({ 'message': 'Username not found!' });

    // checking passowrd
    if (password===foundUser.password) {
        // creating JWTs 
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                }
            },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '600s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log("success in making new user ",result);

        // Creating Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: false, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Sending access token to user
        res.json({ accessToken });

    } else {
        res.sendStatus(401);
    }
} 

module.exports = { handleLogin };