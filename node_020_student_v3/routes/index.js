import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("index", { title: "나의 홈페이지 with loo919239@naver.com" });
});

export default router;
