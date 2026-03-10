
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/adminController");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");
const { RoleMiddleware } = require("../middlewares/RoleMiddleware");

router.post("/register", register);
router.post("/login", login);
// router.get("/profile", AuthMiddleware, RoleMiddleware(["admin"]), (req, res) => {
//   res.json({ message: "Admin profile", admin: req.admin });
// });

module.exports = router;