const { sequelize, Student, Course, Enrollment } = require("../models");
const enrollmentValidator = require("../validation/enrollmentValidation");
const commonValidator = require("../validation/commonValidation");

exports.enrollStudentInCourse = async function (request, response) {
  const t = await sequelize.transaction();
  try {
    const { error, value } =
      enrollmentValidator.EnrollmentCreateSchema.validate(request.body, {
        abortEarly: false,
      });

    if (error) {
      return response
        .status(400)
        .json({ message: error.details.map((err) => err.message) });
    }
    const { studentId, courseId } = value;

    const student = await Student.findByPk(studentId);

    if (!student) {
      return response.status(404).json({ message: "Student Is Not Found" });
    }

    const course = await Course.findByPk(courseId);

    if (!course) {
      return response.status(404).json({ message: "Course Is Not Found" });
    }

    const exists = await Enrollment.findOne({
      where: { StudentId: studentId, CourseId: courseId },
    });
    if (exists) {
      return response
        .status(409)
        .json({ message: "Enrollment Is Already Exist" });
    }
    const count = await Enrollment.count({
      where: { CourseId: courseId },
    });

    if (count >= course.capcity) {
      return response.status(400).json({ messsage: "Capacity Is Full" });
    }

    const enrollment = await Enrollment.create(
      {
        ...value,
        CourseId: courseId,
        StudentId: studentId,
      },
      { transaction: t },
    );

    await t.commit();

    response.status(201).json({ message: enrollment });
  } catch (error) {
    await t.rollback();
    response.status(500).json({ message: "Internal Server Error" });
  }
};
exports.updateEnrollment = async function (request, response) {
  try {
    const { error: IdError } = commonValidator.idParamsSchema.validate(
      request.params,
    );
    if (IdError) {
      return response.status(400).json({ message: IdError.message });
    }
    const { error, value } =
      enrollmentValidator.EnrollmentUpdateSchema.validate(request.body, {
        abortEarly: false,
      });

    if (error) {
      return response
        .status(400)
        .json({ message: error.details.map((err) => err.message) });
    }

    const enrollment = await Enrollment.findByPk(request.params.id);
    if (!enrollment) {
      return response.status(404).json({ message: "Enrollment not found" });
    }
    await enrollment.update(value);
    response.json({ message: "Updated Enrollment Successfully" , enrollment});
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error" });
  }
};
exports.dropEnrollment = async function (request, response) {
    try {
          const { error: IdError } = commonValidator.idParamsSchema.validate(
    request.params,
  );
  if (IdError) {
    return response.status(400).json({ message: IdError.message });
  }
  const { error } = enrollmentValidator.EnrollmentUpdateSchema.validate(
    request.body,
    { abortEarly: false },
  );

  if (error) {
    return response
      .status(400)
      .json({ message: error.details.map((err) => err.message) });
  }
  const enrollment = await Enrollment.findByPk(request.params.id);
  if (!enrollment) {
    return response.status(404).json({ message: "Enrollment not found" });
  }

  await enrollment.destroy()

  response.json({message : "Dropeded Enrollment Successfully"})
    } catch (error) {
        response.status(500).json({message : "Internal Server Error"})
    }
};
