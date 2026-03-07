// Req Router
const router = require("express").Router();

// Req Controllers
const enrollmentController = require("../controllers/enrollmentController");

// Create enrollment
router.post("/", enrollmentController.enrollStudentInCourse);

// Update enrollment
router.put("/:id", enrollmentController.updateEnrollment);

// Delete enrollment
router.delete("/:id", enrollmentController.dropEnrollment);

// Export Routes
module.exports = router;
