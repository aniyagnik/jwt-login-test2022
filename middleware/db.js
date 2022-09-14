const mongoose = require("mongoose");

const mongoLink = "mongodb://project:projectQ12@cluster0-shard-00-00-6zit8.mongodb.net:27017,cluster0-shard-00-01-6zit8.mongodb.net:27017,cluster0-shard-00-02-6zit8.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
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
