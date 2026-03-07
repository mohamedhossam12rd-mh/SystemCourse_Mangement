// Req Database
const { sequelize } = require("../config/dbConfig");

// Req Datatypes
const { DataTypes } = require("sequelize");

// Create Course Model
const Course = sequelize.define(
  "Course",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [3, 150],
      },
    },

    code: {
      type: DataTypes.STRING,
      allowNull: false,

      unique: true,
      validate: {
        is: /^[A-Z]{2,4}[0-9]{3}$/,
      },
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    creditHours: {
      type: DataTypes.INTEGER,
      allowNull: false,

      validate: {
        isInt: true,
        // According to BR
        min: 2,
        max: 5,
      },
    },

    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,

      validate: {
        isInt: true,
        // According to BR
        min: 1,
        max: 500,
      },
    },
  },
  {
    timestamps: true,
    indexes: [{ unique: true, fields: ["code"] }, { fields: ["creditHours"] }],
  },
);

// Export Course
module.exports = { Course };
