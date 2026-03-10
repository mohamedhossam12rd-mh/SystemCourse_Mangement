// Req Router
const router = require("express").Router();

const profileController = require("../controllers/profileController");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");
const { roleMiddleware } = require("../middlewares/RoleMiddleware");

router.put("/:id" ,  AuthMiddleware , roleMiddleware("admin"),profileController.UpdateProfile)

module.exports = router