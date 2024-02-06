import express from "express";
import DB from "../models/index.js";
import { upLoad } from "../modules/file_upload.js";

const PRODUCTS = DB.models.tbl_products;
const IOLIST = DB.models.tbl_iolist;
const DEPTS = DB.models.tbl_depts;
const router = express.Router();

router.get("/", async (req, res) => {
  const rows = await PRODUCTS.findAll({
    limit: 10,
    order: [["p_code", "ASC"]],
  });
  return res.render("product/list", { PRODUCTS: rows });
});

router.get("/insert", (req, res) => {
  return res.render("product/input");
});

router.post("/insert", upLoad.single("p_image"), (req, res) => {
  const file = req.file;

  return res.json({ body: req.body, file });
});

router.get("/:pcode/detail", async (req, res) => {
  const pcode = req.params.pcode;
  const row = await PRODUCTS.findByPk(pcode, { include: { model: IOLIST, as: "IOS", include: { model: DEPTS, as: "IO_거래처" } } });
  return res.render("product/detail", { PRODUCT: row });
});
// router.get("/add", (req, res) => {
//   res.render("product/add");
// });

export default router;
