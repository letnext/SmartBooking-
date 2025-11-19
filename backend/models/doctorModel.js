import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    speciality: {
      type: String,
      required: true,
      trim: true,
    },
    hospital: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
