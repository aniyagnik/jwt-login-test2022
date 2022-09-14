const mongoose = require("mongoose");

const mongoLink = process.env.DATABASE_URI
// connecting db
const connectDb = async () => {
  try {
    await mongoose.connect(mongoLink, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDb;
