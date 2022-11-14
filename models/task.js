'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      task.belongsTo(models.label,{
        foreignKey: 'id_label'
      })
      task.hasOne(models.assigned,{
        foreignKey : "id_task"
      })
    }
  }
  task.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    id_label: DataTypes.INTEGER,
    status_task: DataTypes.INTEGER,
    due_date: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};