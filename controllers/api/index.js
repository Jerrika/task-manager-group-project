const router = require('express').Router();
const userRoutes = require('./user-routes');
const taskRoutes = require('./task-routes');

//Prefix all routes defined in 'user-routes.js' with '/user'
router.use('/user', userRoutes);

//Prefix all routes defined in 'task-routes.js' with '/task'
router.use('/task', taskRoutes);

module.exports= router;