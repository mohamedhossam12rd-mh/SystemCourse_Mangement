// const jwt = require("jsonwebtoken");
// const { Admin } = require("../models/Admin");
// require("dotenv").config();

// exports.AuthMiddleware = async function (req, res, next) {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1]; // Bearer <token>
//     if (!token) {
//       return res.status(401).json({ message: "Invalid token format" });
//     }

//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     const admin = await Admin.findByPk(decoded.id);
//     if (!admin) {
//       return res.status(401).json({ message: "Admin not found" });
//     }

//     req.admin = admin; // هنستخدمه بعد كده في roleMiddleware
//     next();
//   }catch (err) {
//   console.error("AuthMiddleware error:", err); // هتشوف التفاصيل
//   return res.status(401).json({ message: "Unauthorized", error: err.message });
// }
// };

const jwt = require("jsonwebtoken");
const { Admin } = require("../models/Admin");
require("dotenv").config();

exports.AuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1]; // Bearer <token>
    if (!token) return res.status(401).json({ message: "Invalid token format" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const admin = await Admin.findByPk(decoded.id);

    if (!admin) return res.status(401).json({ message: "Admin not found" });

    req.admin = admin; // for RoleMiddleware
    next();
  } catch (err) {
    console.error("AuthMiddleware error:", err);
    return res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};