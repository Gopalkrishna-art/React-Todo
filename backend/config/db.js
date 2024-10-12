const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connected to MONGODB!!");
  } catch (err) {
    console.log("Error in connecting to mongoDB :-");
  }
};

module.exports = connectDB;
