import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// GET /api/products
// Query: keyword, category, minPrice, maxPrice, page, limit, sort
router.get("/", listProducts);

// GET /api/products/:id
router.get("/:id", getProductById);

// POST /api/products (admin)
router.post("/", protect, admin, createProduct);

// PUT /api/products/:id (admin)
router.put("/:id", protect, admin, updateProduct);

export default router;
