//Define table for tasks
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Task extends Model {}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        due_date: {
            type: DataTypes.DATE,
        },
        //Priority can be High, Medium, or Low
        priority: {
            type: DataTypes.STRING,
        },
        //Status can be Pending, In Progress, or Completed
        status: { 
            type: DataTypes.STRING,
            defaultValue: 'pending', 
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'task',
    }
);

module.exports = Task;

