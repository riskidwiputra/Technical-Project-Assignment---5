'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class label extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      label.hasOne(models.task,{
        foreignKey: 'id_label'
      })
    }
  }
  label.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'label',
  });
  return label;
};