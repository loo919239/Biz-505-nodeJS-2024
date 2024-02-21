import express from "express";
import DB from "../models/index.js";
import { upLoad } from "../modules/file_upload.js";
import moment from "moment";

const router = express.Router();
const MEMO = DB.models.tbl_memos;

/* GET home page. */
router.get("/", async (req, res, next) => {
  return res.render("image");
});

const makemSeqNew = (mSeq) => {
  const mSeqPrefix = mSeq.substring(0, 1);
  let mSeqNum = mSeq.substring(1);
  const mSeqNumLength = mSeqNum.length;

  mSeqNum = String(Number(mSeqNum) + 1);
  mSeqNum = mSeqNum.padStart(mSeqNumLength, "0");
  return `${mSeqPrefix}${mSeqNum}`;
};

router.post("/", upLoad.single("p_image"), async (req, res) => {
  let mSeq = req.body.m_seq;
  if (mSeq === "000") {
    // findAll() 을 실행한 결과는 비록 SELECT 된 결과가 0개 또는 1개 뿐이지만
    // 결과는 배열(List) type 이다
    const rows = await MEMO.findAll({ order: [["m_seq", "DESC"]], limit: 1 });
    mSeq = rows[0].m_seq;
    mSeq = makemSeqNew(mSeq);
    req.body.m_seq = mSeq;
  }

  const today = moment().format("YYYY-MM-DD");
  const time = moment().format("HH:mm:ss");
  req.body.m_date = today;
  req.body.m_time = time;

  const file = req.file;
  if (file) {
    req.body.m_image = file.originalname;
  }

  try {
    await MEMO.create(req.body);
    return res.redirect("/list/");
  } catch (error) {
    return res.json(error);
  }
});

export default router;
