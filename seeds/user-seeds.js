const { User } = require('../models/User');

const userData = [
    {
        name: 'test',
        email: 'test@email.com',
        password: 'test123',
    }
];

const userSeeds = async () => {
    try {
        await User.bulkCreate(userData);
        console.log('Users seeded successfully');
    } catch (err) {
        console.error('Error seeding users:', err);
    }
};

module.exports = userSeeds;
