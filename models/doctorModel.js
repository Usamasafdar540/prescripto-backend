const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  speciality: { type: String, required: true },
  degree: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String, required: true },
  available: { type: Boolean, required: true },
  fees: { type: Number, required: true },
  address: {
    line1: { type: String, required: true },
    line2: { type: String, default: "" },
  },
  date: { type: Date, default: Date.now },
  slots_booked: { type: Array, default: [] },
});

module.exports = mongoose.model("Doctor", doctorSchema);
