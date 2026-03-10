// Req Router
const router = require("express").Router();

// Req Controllers
const courseController = require("../controllers/courseController");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");
const { roleMiddleware } = require("../middlewares/RoleMiddleware");

// Get All Course
router.get("/",  AuthMiddleware , roleMiddleware("admin"),courseController.getAllCourse);

// Get Single Course
router.get("/:id",  AuthMiddleware , roleMiddleware("admin"),courseController.getSingleCourse);

// Create Course
router.post("/",  AuthMiddleware , roleMiddleware("admin"),courseController.createCourse);

// Update Course
router.put("/:id",  AuthMiddleware , roleMiddleware("admin"),courseController.updateCourse);

// Delete Course
router.delete("/:id",  AuthMiddleware , roleMiddleware("admin"),courseController.deleteCourse);

//Get Student Courses
router.get("/:id/students",  AuthMiddleware , roleMiddleware("admin"),courseController.getCourseStudents);

// Export Routes
module.exports = router;