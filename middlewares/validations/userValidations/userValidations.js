const Joi = require("joi");

const createDoctor = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
  image: Joi.string().uri().required(),
  address: Joi.object({
    line1: Joi.string().optional().allow(""),
    line2: Joi.string().optional().allow(""),
  }).default({ line1: "", line2: "" }),
  dob: Joi.string().optional().default("Not Selected"),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/) 
    .default("00000000000"),
});

module.exports = createDoctor;
