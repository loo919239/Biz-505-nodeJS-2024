/**
 * express 프레임워크를 사용하여
 */
import mysql from "mysql2";
import express from "express";

const router = express.Router();
// const dbConn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "!Biz8080",
//   database: "schoolDB",
//   port: "3306",
// });

// localhost:3000/studnet
router.get("/", (req, res) => {
  res.render("student/list");
});

router.get("/insert", (req, res) => {
  res.render("student/input.pug");
});

export default router;
