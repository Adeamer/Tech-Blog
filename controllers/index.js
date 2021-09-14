// Bringing in the express router and the routes files
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
// Using the routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

// Define a catch-all route for any resource that doesn't exist
router.use((req, res) => {
    res.status(404).end();
  });
  
  module.exports = router;