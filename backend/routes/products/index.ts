import express from "express";
import { searchProducts, getProduct } from "../../controllers/products";

const router = express.Router();

router.get("/", searchProducts);
router.get("/:id", getProduct);

export default router;
