const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Management extends Model {}

Management.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    management_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'management',
  }
);

module.exports = Management;
