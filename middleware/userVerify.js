const jwt = require('jsonwebtoken');

const userVerify = (req, res, next) => {
    const ACCESS_TOKEN_SECRET="20b5b6beb948a53eac1a24f266a6437e9e16dad8ca9ff5555bddc1ee7830253d98adb8c2142cb259c28d6a12acf8c82c4d7252fd70bb5c6bb832dab4639d30bf"
    // verifying is user is logged in or not
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log("auth ", authHeader)
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // checking invalid auth
    
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        ACCESS_TOKEN_SECRET,
        (err, decodedUser) => {
            if (err) return res.status(403).json({'message': err});
            console.log('decoded')
            req.user = decodedUser.UserInfo.username;
            next();
        }
    );
}

module.exports = userVerify