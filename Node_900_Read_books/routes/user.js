import express from "express";
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.render("users/join");
});

export default router;
