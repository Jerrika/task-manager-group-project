const User = require('./User');
const Task= require('./Task');

//Define associations
User.hasMany(Task, {
    foreignKey: 'task_id',
    onDelete: 'CASCADE',
});

module.exports = {User, Task};