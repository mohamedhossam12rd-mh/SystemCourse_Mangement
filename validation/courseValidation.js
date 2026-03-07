const joi = require("joi");

const courseCreateSchema = joi.object({
  title: joi.string().min(3).max(150).required(),
  code: joi
    .string()
    .pattern(/^[A-Z]{2,4}[0-9]{3}$/)
    .required(),
  description: joi.string().required(),
  creditHours: joi.number().integer().min(2).max(5).required(),
  capacity: joi.number().integer().min(1).max(500).required(),
});

const courseUpdateSchema = joi.object({
  title: joi.string().min(3).max(150).required(),
  code: joi
    .string()
    .pattern(/^[A-Z]{2,4}[0-9]{3}$/)
    .required(),
  description: joi.string().required(),
  creditHours: joi.number().integer().min(2).max(5).required(),
  creditHours: joi.number().integer().min(1).max(500).required(),
});

module.exports = {courseCreateSchema , courseUpdateSchema}