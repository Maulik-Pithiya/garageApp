import express from "express";
import { getVehicles, createVehicle, updateVehicle, deleteVehicle, getAppConfig } from "../controller/vehicleController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/vehicles", getVehicles);
router.get("/config", getAppConfig);

// Protected Admin CRUD routes
router.post("/vehicle", protectAdmin, createVehicle);
router.put("/vehicle/:id", protectAdmin, updateVehicle);
router.delete("/vehicle/:id", protectAdmin, deleteVehicle);

export default router;
