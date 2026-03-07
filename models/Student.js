// Req Database
const { sequelize } = require("../config/dbConfig");

// Req Datatypes
const { DataTypes } = require("sequelize");

// Req Bcrypt
const bcrypt = require("bcrypt");

// Create Student Model
const Student = sequelize.define(
  "Student",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,

      validate: {
        isEmail: true,
        notEmpty: true,
      },

      set(value) {
        this.setDataValue("email", value.toLowerCase().trim());
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [8, 100],
      },
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [2, 50],
        is: /^[a-zA-Z]+$/i,
      },
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [2, 50],
        is: /^[a-zA-Z]+$/i,
      },
    },

    status: {
      type: DataTypes.ENUM("active", "suspended", "graduated"),
      defaultValue: "active",
    },
  },
  {
    timestamps: true,
    
    indexes: [{ unique: true, fields: ["email"] }, { fields: ["status"] }],

    hooks: {
      beforeCreate: async function (student) {
        student.password = await bcrypt.hash(student.password, 10);
      },
      
      beforeUpdate: async function (student) {
        if (student.changed("password")) {
          student.password = await bcrypt.hash(student.password, 10);
        }
      },
    },
  },
);

module.exports = { Student };
