const User = require("../model/User");
const axios = require("axios");

const getAllUsers = async (req, res) => {
  console.log("in all users");
  const foundUser = await User.find();
  res.status(200).json(foundUser);
};

const handleNewsApiRequest = async (req, res) => {
  console.log("in handleNewsApi");
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const newDate = year + "-" + month + "-" + day;
  const NEWS_URL =
    "https://newsapi.org/v2/everything?" +
    "q=Apple&" +
    `from=${newDate}&` +
    "sortBy=popularity&" +
    "apiKey=dae44bae76c94726b2514cf582225e7f";
  try {
    const result = await axios(NEWS_URL);
    // console.log(result.data.articles);
    res.send(result.data.articles);
  } catch (err) {
    console.log(err);
  }
};
const handleUserLogout = async (req, res) => {
  // On client, also delete the accessToken
  // check cokkies in request
  console.log("in logout");
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

const deleteUsers = async (req, res) => {
  let query = User.deleteOne({ username: req.params.username }).exec();;
  res.status(200).json({ message: "user deleted", query });
};
module.exports = {
  handleUserLogout,
  handleNewsApiRequest,
  getAllUsers,
  deleteUsers,
};
