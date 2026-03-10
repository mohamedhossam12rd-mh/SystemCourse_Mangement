// Req Dotenv
require("dotenv").config();
// Req Modules
const express = require("express");
// Req Cors
const cors = require("cors");
// Req Express Rate Limit
const rateLimit = require("express-rate-limit");

// Req Database Config
const { sequelize } = require("./models");

// Server
const app = express(); 

// Configurations
const PORT = process.env.PORT ?? 3000;

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
const adminRoutes = require("./routes/adminRoutes")
const studentRoutes = require("./routes/studentRoutes");
const profileRoutes = require("./routes/profileRoutes")
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");

// Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
// Routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/students", studentRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/courses", courseRoutes) 
app.use("/api/v1/Enrollments", enrollmentRoutes) 
// Run Server
app.listen(PORT, async function () {
  console.log(`SERVER RUNNING @PORT: ${PORT}`);
  // Test First Connection To Database
  await sequelize.authenticate({logging : false});
  console.log("DATABASE CONNECTED SUCCESSFULLY");
  await sequelize.sync({logging : false , force : false , alter : true});
});
