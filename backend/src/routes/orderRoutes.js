import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getMyOrders,
  getOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

// POST /api/orders
router.post("/", protect, createOrder);

// GET /api/orders/my
router.get("/my", protect, getMyOrders);

// GET /api/orders/:id
router.get("/:id", protect, getOrderById);

export default router;
