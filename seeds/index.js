const taskSeeds = require('./task-seeds');
const userSeeds = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({force: true});
    console.log('\n----- DATABASE SYNCED -----\n');

    await userSeeds();
    console.log('\n----- USERS SEEDED -----\n');

    await taskSeeds();
    console.log('\n----- TASKS SEEDED -----\n');

    process.exit(0);
};

seedAll();