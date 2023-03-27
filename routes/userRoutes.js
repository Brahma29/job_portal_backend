const express = require('express');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');
const {
  allUsers,
  singleUser,
  editUser,
  deleteUser,
  createUserJobHistory,
} = require('../controllers/userController');

const router = express.Router();

//user Routes
router.get('/allusers', isAuthenticated, isAdmin, allUsers);
router.get('/user/:id', isAuthenticated, singleUser);
router.put('/user/:id', isAuthenticated, editUser);
router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser);
router.post('/user/jobhistory', isAuthenticated, createUserJobHistory);

module.exports = router;
