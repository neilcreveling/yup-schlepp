// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Images extends Model {}

// Images.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     unit_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'unit',
//         key: 'id',
//       },
//     },
//     tag_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'tag',
//         key: 'id',
//       },
//     },
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'images',
//   }
// );

// module.exports = Images;
