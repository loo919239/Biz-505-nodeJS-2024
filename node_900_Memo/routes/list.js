import express from "express";
import DB from "../config/mysql.js";
import moment from "moment";
import { Op } from "sequelize";

const dbConn = DB.init();

const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  const today = moment().format("YYYY-MM-DD");
  const time = moment().format("HH:mm:ss");
  const sql = "SELECT * FROM tbl_memos ";
  dbConn.query(sql, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.render("list", { Memolist: result, today, time });
    }
  });
});
router.get("/:m_seq/detail", async (req, res) => {
  return res.render("product/detail");
});
export default router;
