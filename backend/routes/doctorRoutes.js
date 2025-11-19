import express from "express";
import {
  addDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

// ✅ Create doctor
router.post("/adding", addDoctor);

// ✅ Get all doctors
router.get("/getting-all", getAllDoctors);

// ✅ Get one doctor by ID
router.get("/:id", getDoctorById);

// ✅ Update doctor
router.put("/:id", updateDoctor);

// ✅ Delete doctor
router.delete("/:id", deleteDoctor);

export default router;
