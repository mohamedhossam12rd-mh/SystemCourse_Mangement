// Req Router
const router = require("express").Router();

// Req Controllers
const studentController = require("../controllers/studentController");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");
const { roleMiddleware } = require("../middlewares/RoleMiddleware");

// Get All Students
router.get(
  "/",
  AuthMiddleware,
  roleMiddleware("admin"),
  studentController.getAllStudents,
);

// Get Single Student
router.get(
  "/:id",
  AuthMiddleware,
  roleMiddleware("admin"),
  studentController.getSingleStudent,
);

// Create Student
router.post(
  "/",
  AuthMiddleware,
  roleMiddleware("admin"),
  studentController.createStudent,
);

// Update Student
router.put(
  "/:id",
  AuthMiddleware,
  roleMiddleware("admin"),
  studentController.updateStudent,
);

// Delete Student
router.delete(
  "/:id",
  AuthMiddleware,
  roleMiddleware("admin"),
  studentController.deleteStudent,
);

// Export Routes
module.exports = router;
