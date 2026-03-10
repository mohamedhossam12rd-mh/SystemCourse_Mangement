// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../config/dbConfig");
// const bcrypt = require("bcrypt");

// const Admin = sequelize.define(
//   "Admin",
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     name : {
//       type : DataTypes.STRING,
//       allowNull : false,
//       validate : {
//         len: [2, 50],
//         is : /^[a-zA-Z]+$/i
//       }
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: { isEmail: true },
//       set(value) {
//         this.setDataValue("email", value.toLowerCase().trim());
//       },
//     },

//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate :{
//         len : [8 , 100]
//       }
//     },

//     role: {
//       type: DataTypes.STRING,
//       defaultValue: "admin",
//     },
//   },
//   {
//     timestamps: true,
//     indexes: [{ unique: true, fields: ["email"] }],
//     hooks: {
//       beforeCreate: async function (admin) {
//         admin.password = await bcrypt.hash(admin.password, 10);
//       },
//       beforeUpdate: async function (admin) {
//         if (admin.changed("password")) {
//           admin.password = await bcrypt.hash(admin.password, 10);
//         }
//       },
//     },
//   }
// );
// Admin.prototype.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// module.exports = { Admin };

const { sequelize } = require("../config/dbConfig");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // لازم يكون هنا
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "admin" },
}, {
  hooks: {
    beforeCreate: async (admin) => {
      if (admin.password) {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
      }
    },
  },
});

module.exports = { Admin };