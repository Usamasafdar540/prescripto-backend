const Joi = require("joi");

const addDoctorValidations = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
  speciality: Joi.string().required(),
  degree: Joi.string().required(),
  experience: Joi.string().required(),
  about: Joi.string().required(),
  available: Joi.boolean().optional(),
  fees: Joi.number().positive().required(),
  address: Joi.object({
    line1: Joi.string().required(),
    line2: Joi.string().allow(null, ""),
  }).required(),
  date: Joi.date().default(() => new Date()),
  slots_booked: Joi.array().items(Joi.object()).default([]),
});

module.exports = { addDoctorValidations };