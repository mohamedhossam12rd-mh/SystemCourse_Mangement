// Req Database
const { sequelize } = require("../config/dbConfig");

// Req Datatypes
const { DataTypes } = require("sequelize");

// Create Profile Model
const Profile = sequelize.define(
  "Profile",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,

      validate: {
        is: /^[0-9]{10,15}$/,
      },
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [5, 255],
      },
    },

    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,

      validate: {
        isDate: true,

        isAfter: "1900-01-01",
        isBefore: new Date().toISOString().split("T")[0],
      },
    },
  },
  { timestamps: true },
);

// Export Profile
module.exports = { Profile };
