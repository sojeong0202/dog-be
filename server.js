const express = require("express");
const app = express();

require("dotenv").config();

const connectDB = require("./database.js");

let db;
connectDB
  .then((client) => {
    console.log("DB연결성공");
    db = client.db(process.env.DB_NAME);
    app.listen(process.env.PORT, () => {
      console.log("서버 실행 중");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (요청, 응답) => {
  응답.send("Hello, World!");
});
