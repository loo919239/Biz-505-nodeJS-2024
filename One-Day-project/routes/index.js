import express from "express";
import DB from "../models/index.js";

const router = express.Router();
const STUDENT = DB.models.tbl_student;
const SCORE = DB.models.tbl_score;
const GRADE = DB.models.tbl_grade;

/* GET home page. */

router.get("/", async (req, res, next) => {
  const search = req.query.search;
  try {
    const row = await SCORE.findAll();
    const rows = await STUDENT.findAll();
    return res.render("index", { STUDENT: rows, SCORE: row });
  } catch (error) {
    return res.json(error);
  }
});

router.get("/detail/:s_code", async (req, res) => {
  const s_code = req.params.s_code;
  const rows = await STUDENT.findAll();
  const rowss = await STUDENT.findAll({
    where: { s_code: s_code },
  });
  const row = await GRADE.findAll({ where: { g_code: s_code } });
  try {
    return res.render("index", {
      STUDENT: rows,
      studentdetail: rowss,
      GRADE: row,
    });
  } catch (error) {
    return res.json(error);
  }
});

// router.get("/:s_code/get", async (req, res) => {});

export default router;
