'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class assigned extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      assigned.belongsTo(models.User,{
        foreignKey : "id_user"
      })
    }
  }
  assigned.init({
    id_user: DataTypes.INTEGER,
    id_task: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'assigned',
  });
  return assigned;
};