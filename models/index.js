const { sequelize } = require("../config/dbConfig");

const { Student } = require("../models/Student");
const { Course } = require("../models/Course");
const { Profile } = require("../models/Profile");
const { Enrollment } = require("../models/Enrollment");

Student.hasOne(Profile, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

Profile.belongsTo(Student);

Student.belongsToMany(Course, { through: Enrollment, onDelete: "CASCADE" });
Course.belongsToMany(Student, { through: Enrollment, onDelete: "CASCADE" });

module.exports = { Student, Profile, Course, Enrollment, sequelize };
