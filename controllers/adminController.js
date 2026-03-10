// const { Admin } = require("../models/Admin");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// // 🔹 Register Admin
// exports.adminRegister = async function (request, response) {
//   try {
//     const { error, value } = adminValidation.adminRegister.validate(request.body, { abortEarly: false });
//     if (error) {
//       return response.status(400).json({ error: error.details.map(err => err.message) });
//     }

//     const existingAdmin = await Admin.findOne({ where: { email: value.email } });
//     if (existingAdmin) return response.status(409).json({ message: "Email Already Exist" });

//     const hashedPassword = await bcrypt.hash(value.password, 12);

//     const admin = await Admin.create({
//       email: value.email,
//       password: hashedPassword,
//       role: "admin", // default
//     });

//     response.status(201).json({ message: "Admin registered successfully", adminId: admin.id });
//   } catch (error) {
//     response.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // 🔹 Login Admin
// exports.adminLogin = async function (request, response) {
//   try {
//     const { email, password } = request.body;

//     const admin = await Admin.findOne({ where: { email } });
//     if (!admin) return response.status(404).json({ message: "Admin not found" });

//     const isValid = await bcrypt.compare(password, admin.password);
//     if (!isValid) return response.status(401).json({ message: "Incorrect password" });

//     const token = jwt.sign(
//       { id: admin.id, role: admin.role },
//       process.env.SECRET_KEY, // صححنا هنا
//       { expiresIn: "1h" }
//     );

//     response.status(200).json({ message: "Login successful", data: { token } });
//   } catch (error) {
//     response.status(500).json({ message: "Internal Server Error" });
//   }
// };
const adminValidation = require("../validation/adminValidation");
const { Admin } = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { error, value } = adminValidation.adminRegister.validate(
      req.body, // ✅ بدل request.body
      { abortEarly: false },
    );
    if (error) {
      return res // ✅ بدل response
        .status(400)
        .json({ error: error.details.map((err) => err.message) });
    }

    const { name, email, password } = value;
    const existing = await Admin.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const admin = await Admin.create({ name, email, password });
    res.status(201).json({
      message: "Admin registered",
      admin: { id: admin.id, email: admin.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { error, value } = adminValidation.adminLogin.validate(
      req.body, // ✅ بدل request.body
      { abortEarly: false },
    );
    if (error) {
      return res // ✅ بدل response
        .status(400)
        .json({ error: error.details.map((err) => err.message) });
    }

    const { email, password } = value;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin)
      return res.status(400).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};