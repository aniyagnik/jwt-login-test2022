const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
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
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            //checking for user
            if (err || foundUser.username !== decoded.username) return res.status(403).json({'message': err});
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }