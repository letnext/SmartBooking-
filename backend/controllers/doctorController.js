import Doctor from "../models/doctorModel.js";

// === CREATE DOCTOR ===
export const addDoctor = async (req, res) => {
  try {
    const { name, speciality, hospital, experience } = req.body;

    if (!name || !speciality || !hospital || !experience) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newDoctor = await Doctor.create({
      name,
      speciality,
      hospital,
      experience,
    });

    res.status(201).json({
      message: "Doctor added successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// === GET ALL DOCTORS ===
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// === GET SINGLE DOCTOR ===
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// === UPDATE DOCTOR ===
export const updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedDoctor)
      return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json({
      message: "Doctor updated",
      doctor: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// === DELETE DOCTOR ===
export const deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!deletedDoctor)
      return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
