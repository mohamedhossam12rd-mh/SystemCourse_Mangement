const joi = require("joi");

const adminRegister = joi.object({
  name: joi.string().min(2).max(50).pattern(/[A-Z]/).pattern(/[a-z]/),
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(8)
    .max(100)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .pattern(/[!@#$%^&*]/),
  role: joi.string().valid("admin").default("admin"),
});
const adminLogin = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(8)
    .max(100)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .pattern(/[!@#$%^&*]/),
  role: joi.string().valid("admin").default("admin"),
});

module.exports = {adminRegister , adminLogin}