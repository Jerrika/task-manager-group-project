const User = require('./User');
const Task= require('./Task');

//Define associations
User.hasMany(Task, {
    foreignKey: 'id',
    onDelete: 'CASCADE',
});

module.exports = {User, Task};