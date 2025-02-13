const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Doctor = require("../../models/doctorModel");
const Jwt = require("jsonwebtoken");
const { cloudinaryUploadImg } = require("../../services/cloudinary");
const {
  addDoctorValidations,
} = require("../../middlewares/validations/doctorValidations/doctorsValidations");
const sendResponse = require("../../util/sendResponse");
const sendError = require("../../util/sendError");
//LOGIN ADMIN
const generateToken = (email) => {
  return Jwt.sign({ email,role:"admin" }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const loginAdmin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD 
    ) {
      const token = generateToken(email);

      return sendResponse(res, 200, "Admin logged in successfully.", {
        token,
      });
    } else {
      return sendError(res, 401, "Invalid email or password.");
    }
  } catch (error) {
    return sendError(res, 500, "An unexpected error occurred.", error);
  }
});

const addDoctor = asyncHandler(async (req, res, next) => {
  try {
    const { error } = addDoctorValidations.validate(req.body);
    if (error) {
      return sendError(res, 400, error.details[0].message);
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

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return sendError(res, 409, "Doctor already exists with this email.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!req.file) {
      return sendError(res, 400, "Image is required.");
    }

    let imageUrl = "";
    try {
      const cloudinaryResult = await cloudinaryUploadImg(req.file.path);
      imageUrl = cloudinaryResult.url;
    } catch (uploadError) {
      return sendError(res, 500, "Failed to upload image.", uploadError);
    }

    // Create new doctor record
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
      image: doctor.image,
    };

    return sendResponse(res, 201, "Doctor added successfully.", payload);
  } catch (error) {
    return sendError(res, 500, "An unexpected error occurred.", error);
  }
});

module.exports = {
  addDoctor,
  loginAdmin,
};
