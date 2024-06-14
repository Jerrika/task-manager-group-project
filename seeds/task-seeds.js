const { Task } = require('../models/Task');

const taskData = [
    {
        title: 'test',
        description: 'this is a test',
        due_date: 'today',
        priority: 'low',
        status: 'pending',
        assigned_to: 'me',
        created_by: 'me',
    }
];

const taskSeeds = () => Task.bulkCreate(taskData);

module.exports = taskSeeds;