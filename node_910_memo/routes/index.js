import express from "express";
import moment from "moment";
import DB from "../models/index.js";
const MEMOS = DB.models.tbl_memos;
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  // moment 를 사용하여 현재 날짜와 시간을 문자열로 getter
  const toDate = moment().format("YYYY-MM-DD");
  const toTime = moment().format("HH:mm:ss");

  //index.pug 를 rendering 할때 사용하도록 보내주기
  res.render("index", { toDate, toTime });
});

router.post("/", async (req, res) => {
  try {
    req.body.m_author = "loo919239@naver.com";
    await MEMOS.create(req.body);
    return res.redirect("/");
  } catch (error) {
    return res.json(error);
  }
});

router.get("/get_new_date", async (req, res) => {
  const toDate = moment().format("YYYY-MM-DD");
  const toTime = moment().format("HH:mm:ss");
  // JSON 의 변수(key) 이름과 value 의 이름이 같을때는 한번 생략 가능
  // return res.json({ todate: todate, toTime: toTime });
  return res.json({ toDate, toTime });
});

export default router;
