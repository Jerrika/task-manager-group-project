const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use('/task', (req, res) => {
    res.render('task')
  });

  router.use('/profile', (req, res) => {
    res.render('profile')
  });

router.use('/', (req, res) => {
    res.render('landing')
  });

module.exports = router;