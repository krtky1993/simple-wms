import express from "express";
import {
	searchOrders,
	getOrder,
	getItemsForPicking,
	getItemsForPacking,
} from "../../controllers/orders";

const router = express.Router();

router.get("/", searchOrders);
router.get("/picking", getItemsForPicking);
router.get("/packing", getItemsForPacking);
router.get("/:id", getOrder);

export default router;
