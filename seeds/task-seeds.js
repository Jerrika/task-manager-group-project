const { Task } = require('../models');

const taskData = [
    {
        title: 'test',
        description: 'this is a test',
        due_date: new Date('2024-06-16'),
        priority: 'low',
        status: 'pending',
    }
];

const taskSeeds = () => Task.bulkCreate(taskData);

module.exports = taskSeeds;