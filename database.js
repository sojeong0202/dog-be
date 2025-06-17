const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
    });
    console.log("MongoDB 연결 성공");
  } catch (error) {
    console.error("MongoDB 연결 실패", error);
    process.exit(1);
  }
};

module.exports = connectDB;
