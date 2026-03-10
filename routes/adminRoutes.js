
const express = require("express");
const router = express.Router();
const { register, login, profile } = require("../controllers/adminController");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");
const { roleMiddleware } = require("../middlewares/RoleMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", AuthMiddleware, roleMiddleware("admin") , profile);

module.exports = router;