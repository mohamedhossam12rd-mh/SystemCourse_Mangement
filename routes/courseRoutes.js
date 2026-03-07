// Req Router
const router = require("express").Router();

// Req Controllers
const courseController = require("../controllers/courseController");

// Get All Course
router.get("/", courseController.getAllCourse);

// Get Single Course
router.get("/:id", courseController.getSingleCourse);

// Create Course
router.post("/", courseController.createCourse);

// Update Course
router.put("/:id", courseController.updateCourse);

// Delete Course
router.delete("/:id", courseController.deleteCourse);

//Get Student Courses
router.get("/:id/students", courseController.getCourseStudents);

// Export Routes
module.exports = router;