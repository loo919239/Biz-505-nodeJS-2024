import express from "express";
import DB from "../config/mysql.js";

const router = express.Router();
const dbConn = DB.init();

router.get("/", (req, res) => {
  const sql = "SELECT * FROM tbl_book";
  dbConn.query(sql, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.render("book/list", { bookList: result });
    }
  });
});

router.get("/insert", (req, res) => {
  res.render("book/input.pug");
});

router.post("/insert", (req, res) => {
  const b_isbn = req.body.isbn;
  const b_title = req.body.title;
  const b_author = req.body.author;
  const b_publisher = req.body.publisher;
  const b_price = req.body.isbn;

  const params = [b_isbn, b_title, b_author, b_publisher, b_price];
  const sql = " INSERT INTO tbl_book(b_isbn, b_title, b_author, b_publisher, b_price) " + " VALUES( ?, ?, ?, ?, ? ) ";

  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.redirect("/book/");
    }
  });
});

router.get("/:b_isbn/detail", (req, res) => {
  const b_isbn = req.params.b_isbn;
  console.log(b_isbn);
  const params = [b_isbn];
  const sql = "SELECT * FROM tbl_book WHERE b_isbn = ?";
  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.render("book/detail", { BOOK: result[0] });
    }
  });
});

export default router;
