const adminValidation = require("../validation/adminValidation");
const { Admin } = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (request, response) => {
  try {
    const { error, value } = adminValidation.adminRegister.validate(
      request.body,
      { abortEarly: false },
    );
    if (error) {
      return response
        .status(400)
        .json({ error: error.details.map((err) => err.message) });
    }

    const { name, email, password } = value;
    const existing = await Admin.findOne({ where: { email } });
    if (existing)
      return response.status(409).json({ message: "Email already exists" });

    const admin = await Admin.create({ name, email, password });
    response.status(201).json({
      message: "Admin registered",
      admin: { id: admin.id, email: admin.email },
    });
  } catch (err) {
    console.error(err);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (request, response) => {
  try {
    const { error, value } = adminValidation.adminLogin.validate(request.body, {
      abortEarly: false,
    });
    if (error) {
      return response
        .status(400)
        .json({ error: error.details.map((err) => err.message) });
    }

    const { email, password } = value;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin)
      return res.status(400).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match)
      return response
        .status(400)
        .json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
    );

    response.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.profile = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.admin.id, {
      attributes: {exclude : ["password"]},
    });

    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.json({
      admin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
