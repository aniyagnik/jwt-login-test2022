const User = require("../model/User");

const handleUserLogout = async (req, res) => {
  // On client, also delete the accessToken
  // check cokkies in request
  console.log('in logout');
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  // checking for user by refreshToken in db
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204); // no content
  }

  // Deleting refreshToken in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);
  // remove cookie from response - logout
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

module.exports = { handleUserLogout };
