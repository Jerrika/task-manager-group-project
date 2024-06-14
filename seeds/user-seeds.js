const { User } = require('../models/User');

const userData = [
    {
        name: 'test',
        email: 'test@email.com',
        password: 'test123',
    }
];

const userSeeds = () => User.bulkCreate(userData);

module.exports = userSeeds;
