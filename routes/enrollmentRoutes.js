// Req Router
const router = require("express").Router();

// Req Controllers
const enrollmentController = require("../controllers/enrollmentController");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");
const { roleMiddleware } = require("../middlewares/RoleMiddleware");

// Create enrollment
router.post("/",  AuthMiddleware , roleMiddleware("admin"),enrollmentController.enrollStudentInCourse);

// Update enrollment
router.put("/:id",  AuthMiddleware , roleMiddleware("admin"),enrollmentController.updateEnrollment);

// Delete enrollment
router.delete("/:id",  AuthMiddleware , roleMiddleware("admin"),enrollmentController.dropEnrollment);

// Export Routes
module.exports = router;
