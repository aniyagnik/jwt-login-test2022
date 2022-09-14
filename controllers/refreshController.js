const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const ACCESS_TOKEN_SECRET="20b5b6beb948a53eac1a24f266a6437e9e16dad8ca9ff5555bddc1ee7830253d98adb8c2142cb259c28d6a12acf8c82c4d7252fd70bb5c6bb832dab4639d30bf"
    const REFRESH_TOKEN_SECRET="73a933103b94927d7713189fa2e0dadeaa8ec34205fa2e9897b752d171ebf600b011055df1442102e7a4c54bc8460b4f665d8dd038ea31b01267b744f8c14c72"
    const cookies = req.cookies;
    // checking cookie
    if (!cookies?.jwt) return res.status(401).json({'message':'Not authorised to access'}) //unauthorised
    const refreshToken = cookies.jwt;

    // finding user by refreshtToken
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.status(403).json({'message':'user not found!'}); //forbidden
    
    // evaluating jwt 
    jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET,
        (err, decodedUser) => {
            //checking for user
            if (err || foundUser.username !== decoded.username) return res.status(403).json({'message': err});
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decodedUser.username,
                    }
                },
                ACCESS_TOKEN_SECRET,
                { expiresIn: '600s' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }