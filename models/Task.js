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
        desription: {},
        due_date: {},
        priority: {},
        status: {},
        assigned_to: {},
        created_by: {},
    }
);

module.exports = Task;

