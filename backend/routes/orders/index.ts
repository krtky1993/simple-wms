import express from "express";
import { searchOrders, getOrder } from "../../controllers/orders";

const router = express.Router();

router.get("/", searchOrders);
router.get("/:id", getOrder);

export default router;
