const joi = require("joi");
const { UUIDSchema } = require("./commonValidation");

const EnrollmentCreateSchema = joi.object({
  studentId: UUIDSchema.required(),
  courseId: UUIDSchema.required(),
  grade: joi.string().valid("A", "B", "C", "D", "E", "F").required(),
  status: joi
    .string()
    .valid("enrolled", "completed", "dropped", "failed")
    .default("enrolled"),
});

const EnrollmentUpdateSchema = joi.object({
  grade: joi.string().valid("A", "B", "C", "D", "E", "F"),
  status: joi
    .string()
    .valid("enrolled", "completed", "dropped", "failed"),
});

module.exports = { EnrollmentCreateSchema, EnrollmentUpdateSchema };
