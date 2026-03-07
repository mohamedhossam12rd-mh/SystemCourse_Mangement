// Req Router
const router = require("express").Router();

// Req Controllers
const studentController = require("../controllers/studentController");

// Get All Students
router.get("/", studentController.getAllStudents);

// Get Single Student
router.get("/:id", studentController.getSingleStudent);

// Create Student
router.post("/", studentController.createStudent);

// Update Student
router.put("/:id", studentController.updateStudent);

// Delete Student
router.delete("/:id", studentController.deleteStudent);

// Export Routes
module.exports = router;
