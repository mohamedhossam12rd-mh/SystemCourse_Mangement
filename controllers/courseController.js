const { Course, Student, Enrollment } = require("../models");
const commonValidation = require("../validation/commonValidation");
const courseValidation = require("../validation/courseValidation");
const { Op } = require("sequelize");

// Get All Courses
exports.getAllCourse = async (request, response) => {
  try {
    const page = Number(request.query.page) || 1;
    const limit = Number(request.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { code, creditHours } = request.query;
    const where = {};

    if (creditHours) {
      where.creditHours = Number(creditHours);
    }

    if (code) {
      where.code = { [Op.like]: `%${code}%` };
    }

    const { rows, count } = await Course.findAndCountAll({
      where,
      limit,
      offset: skip,
      order: [["createdAt", "DESC"]],
    });

    response.json({
      courses: rows,
      total: count,
      limit,
      page,
      pages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Single Course
exports.getSingleCourse = async (request, response) => {
  try {
    const { error, value } =
      commonValidation.idParamsSchema.validate(request.params);

    if (error) {
      return response.status(400).json({ message: error.message });
    }

    const course = await Course.findByPk(value.id, {
      include: [
        {
          model: Student,
          attributes: ["id", "firstName", "lastName", "email"],
          through: {
            attributes: ["grade", "status"],
          },
        },
      ],
    });

    if (!course) {
      return response.status(404).json({ message: "Course Not Found" });
    }

    response.json({ data: course });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: error.message });
  }
};

// Create Course
exports.createCourse = async (request, response) => {
  try {
    const { error, value } =
      courseValidation.courseCreateSchema.validate(request.body, {
        abortEarly: false,
      });

    if (error) {
      return response
        .status(400)
        .json({ message: error.details.map((err) => err.message) });
    }

    const course = await Course.create(value);

    response
      .status(201)
      .json({ message: "Course Created Successfully", course });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: error.message });
  }
};

// Update Course
exports.updateCourse = async (request, response) => {
  try {
    const { error: errorId, value: paramValue } =
      commonValidation.idParamsSchema.validate(request.params);

    if (errorId) {
      return response.status(400).json({ message: errorId.message });
    }

    const course = await Course.findByPk(paramValue.id);

    if (!course) {
      return response.status(404).json({ message: "Course Not Found" });
    }

    const { error, value } =
      courseValidation.courseUpdateSchema.validate(request.body, {
        abortEarly: false,
      });

    if (error) {
      return response
        .status(400)
        .json({ message: error.details.map((err) => err.message) });
    }

    await course.update(value);

    response.json({
      message: "Course Updated Successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Course
exports.deleteCourse = async (request, response) => {
  try {
    const { error: errorId, value: paramValue } =
      commonValidation.idParamsSchema.validate(request.params);

    if (errorId) {
      return response.status(400).json({ message: errorId.message });
    }

    const course = await Course.findByPk(paramValue.id);

    if (!course) {
      return response.status(404).json({ message: "Course Not Found" });
    }

    await course.destroy();

    response.json({ message: "Course Deleted Successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Course Students
exports.getCourseStudents = async (request, response) => {
  try {
    const { error: paramError, value: paramValue } =
      commonValidation.idParamsSchema.validate(request.params);

    if (paramError) {
      return response.status(400).json({ message: paramError.message });
    }

    const course = await Course.findByPk(paramValue.id, {
      include: [
        {
          model: Student,
          attributes: ["id", "firstName", "lastName", "email"],
          through: {
            attributes: ["grade", "status"],
          },
        },
      ],
    });

    if (!course) {
      return response.status(404).json({ message: "Course Not Found" });
    }

    response.status(200).json({ course });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};