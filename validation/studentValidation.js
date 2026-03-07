const joi = require("joi");

const studentCreateSchema = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(8)
    .max(100)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .pattern(/[!@#$%^&*]/)
    .required(),

  firstName: joi
    .string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z]+$/i)
    .required(),
  lastName: joi
    .string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z]+$/i)
    .required(),
  status: joi
    .string()
    .valid("active", "suspended", "graduated")
    .default("active"),

  profile: joi.object({
    phone: joi
      .string()
      .pattern(/^[0-9]{10,15}$/)
      .required(),
    address: joi.string().min(5).max(255).required(),
    dateOfBirth: joi.date().less("now").required(),
  }).required(),
});

const studentUpdateSchema = joi.object({
  email: joi.string().email(),
  password: joi
    .string()
    .min(8)
    .max(100)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .pattern(/[!@#$%^&*]/),

  firstName: joi
    .string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z]+$/i),
  lastName: joi
    .string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z]+$/i)
    ,
  status: joi
    .string()
    .valid("active", "suspended", "graduated")
    .default("active"),
});

const updateProfileSchema = joi.object({
    profile: joi.object({
    phone: joi
      .string()
      .pattern(/^[0-9]{10,15}$/)
      .required(),
    address: joi.string().min(5).max(255),
    dateOfBirth: joi.date().less("now"),
  })
})
module.exports = {studentCreateSchema , studentUpdateSchema , updateProfileSchema}