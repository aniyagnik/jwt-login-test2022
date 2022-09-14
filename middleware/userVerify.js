const jwt = require('jsonwebtoken');

const userVerify = (req, res, next) => {
    // verifying is user is logged in or not
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log("auth ", authHeader)
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // checking invalid auth
    
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decodedUser) => {
            if (err) return res.status(403).json({'message': err});
            console.log('decoded')
            req.user = decodedUser.UserInfo.username;
            next();
        }
    );
}

module.exports = userVerify