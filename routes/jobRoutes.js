const express = require('express');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');
const {
  createJob,
  singleJob,
  updateJob,
  showJobs,
} = require('../controllers/jobsController');

const router = express.Router();

//jobType Routes
router.post('/job/create', isAuthenticated, isAdmin, createJob);
router.get('/job/:id', singleJob);
router.put('/job/update/:id', isAuthenticated, isAdmin, updateJob);
router.get('/jobs/show', showJobs);

module.exports = router;
