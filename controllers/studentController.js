const { Student, Profile, sequelize } = require("../models");

const studentSchema = require("../validation/studentValidation");
const commonValidation = require("../validation/commonValidation");

const { Op } = require("sequelize");

exports.getAllStudents = async function (request, response) {
  try {
    const page = Number(request.query.page) || 1;
    const limit = Number(request.query.limit) || 10;

    const skip = (page - 1) * limit;

    const { search, status } = request.query;
    const where = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where[Op.or] = [
        { firstName: { [Op.like]: `%${search}%` } },
        { lastName: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    const { rows, count } = await Student.findAndCountAll({
      where,
      limit,
      offset: skip,
      attributes: { exclude: "password" },
      include: [
        { model: Profile, attributes: ["phone", "address", "dateOfBirth"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    response.status(200).json({
      student: rows,
      total: count,
      pages: Math.ceil(count / limit),
      limit,
      skip,
      page,
    });
  } catch (error) {
    return response.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getSingleStudent = async function (request, response) {
  try {
    const { error, value } = commonValidation.idParamsSchema.validate(
      request.params,
    );
    if (error) {
      return response.status(400).json({ message: error.message });
    }

    const student = await Student.findByPk(value.id, {
      include: [
        { model: Profile, attributes: ["phone", "address", "dateOfBirth"] },
      ],
    });

    if (!student) {
      return response.status(404).json({ message: "Student Not Found" });
    }

    response.json({ message: "Student Detalis", data: { student } });
  } catch (error) {
    return response.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createStudent = async function (request, response) {
  const t = await sequelize.transaction();
  try {
    // Validation
    const { error, value } = studentSchema.studentCreateSchema.validate(
      request.body,
      { abortEarly: false },
    );
    if (error)
      return response
        .status(400)
        .json({ error: error.details.map((err) => err.message) });

    // Check Email
    const emailExist = await Student.findOne({ where: { email: value.email } });

    if (emailExist)
      return response.status(409).json({ message: "Email already exists" });

    // Create Student with Profile
    const student = await Student.create(
      { ...value, Profile: value.profile },
      { transaction: t, include: Profile },
    );

    await t.commit();

    return response.status(201).json({ student });
  } catch (err) {
    console.log(err);
    await t.rollback();
    return response.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateStudent = async function (request, response) {
  try {
    const { error: errorId } = commonValidation.idParamsSchema.validate(
      request.params,
    );

    if (errorId) {
      return response.status(400).json({ message: errorId.message });
    }

    const { error, value } = studentSchema.studentUpdateSchema.validate(
      requests.body,
      {
        abortEarly: false,
      },
    );

    if (error) {
      return response
        .status(400)
        .json({ message: error.details.map((err) => err.message) });
    }

    const student = await Student.findByPk(request.params.id);

    if (!student) {
      return response.status(404).json({ message: "Student Is Not Found" });
    }

    await student.update(value);

    response.json({ message: "Update Student Successfully" });
  } catch (error) {
    return response.status(500).json({ message: "Internal Server Error" });
  }
};
exports.deleteStudent = async function (request, response) {
  try {
    const { error: errorId } = commonValidation.idParamsSchema.validate(
      request.params,
    );

    if (errorId) {
      return response.status(400).json({ message: errorId.message });
    }
    const student = await Student.findByPk(request.params.id);

    if (!student) {
      return response.status(404).json({ message: "Student Is Not Found" });
    }

    await student.destroy();

    response.json({ message: "Student Deleted Successfully" });
  } catch (error) {
    return response.status(500).json({ message: "Internal Server Error" });
  }
};
