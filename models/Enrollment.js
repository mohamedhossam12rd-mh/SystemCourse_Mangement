// Req Database
const { sequelize } = require("../config/dbConfig");

// Req Datatypes
const { DataTypes } = require("sequelize");

// Create Enrollment Model: M-N - Junction Table
const Enrollment = sequelize.define(
  "Enrollment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    grade: {
      type: DataTypes.ENUM("A", "B", "C", "D", "E", "F"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("enrolled", "completed", "dropped", "failed"),
      defaultValue: "enrolled",
    },
    enrolledAt: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    indexes: [{ unique: true, fields: ["StudentId", "CourseId"] }],
  },
);

// Export Enrollment Model
module.exports = { Enrollment };
