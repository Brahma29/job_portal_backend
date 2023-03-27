const express = require('express');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');
const {
  createJobType,
  allJobTypes,
  updateJobType,
  deleteJobType,
} = require('../controllers/jobTypeController');

const router = express.Router();

//jobType Routes
router.post('/type/create', isAuthenticated, isAdmin, createJobType);
router.get('/type/jobs', isAuthenticated, allJobTypes);
router.put('/type/update/:id', isAuthenticated, isAdmin, updateJobType);
router.delete('/type/delete/:id', isAuthenticated, isAdmin, deleteJobType);

module.exports = router;
