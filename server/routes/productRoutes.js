import express from "express";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../controller/productController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/products", getProducts);

// Protected Admin CRUD routes
router.post("/product", protectAdmin, createProduct);
router.put("/product/:id", protectAdmin, updateProduct);
router.delete("/product/:id", protectAdmin, deleteProduct);

export default router;
