const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Doctor = require("../../models/doctorModel");
const { cloudinaryUploadImg } = require("../../services/cloudinary");
const {addDoctorValidations} = require("../../middlewares/validations/doctorValidations/doctorsValidations")
const addDoctor = asyncHandler(async (req, res, next) => {
  try {
    console.log("✅ addDoctorValidations:", addDoctorValidations);
    console.log("✅ Request Body:", req.body);
    // Validate request body
    const { error } = addDoctorValidations.validate(req.body);
    if (error) {
      return res.status(400).json({ status: false, message: error.details[0].message });
    }

    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      available,
    } = req.body;

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(409).json({ status: false, message: "Doctor Already Exists With This Email" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let imageUrl = "";
    if (req.file) {
      try {
        const cloudinaryResult = await cloudinaryUploadImg(req.file.path);
        imageUrl = cloudinaryResult.url;
      } catch (uploadError) {
        return res.status(500).json({ status: false, message: "Failed To Upload Image", error: uploadError.message });
      }
    } else {
      return res.status(400).json({ status: false, message: "Image is required" });
    }

    // Create Doctor
    const doctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      available,
      image: imageUrl,
      date: new Date(),
    });

    await doctor.save();

    // Create payload for response
    const payload = {
      id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      speciality: doctor.speciality,
      degree: doctor.degree,
      experience: doctor.experience,
      about: doctor.about,
      fees: doctor.fees,
      address: doctor.address,
      available: doctor.available,
      image: doctor.image, // Fixed key name
    };

    return res.status(201).json({
      status: true,
      message: "Doctor Added Successfully",
      data: payload,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  addDoctor,
};
