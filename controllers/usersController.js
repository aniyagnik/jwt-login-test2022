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

const deleteUser = async (req, res) => {
  console.log('in delete user')
  // searching for user to delete in Db
  const userToDelete = await User.findOne({ username: req.body.username }).exec();
  console.log('user to delete ', userToDelete,!userToDelete )
  if (!userToDelete) {
    return res.status(204).json({ message: `User ${req.body.username} not found` });
  }
  // delete user
  const result = await User.deleteOne({ username: req.body.username });
  res.status(200).json(result);
};

module.exports = { handleUserLogout, deleteUser };
