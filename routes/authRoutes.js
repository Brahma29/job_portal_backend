const express = require('express');
const {
  signUp,
  signIn,
  logout,
  userProfile,
} = require('../controllers/authControllers');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

//auth routes
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/logout', logout);
router.get('/me', isAuthenticated, userProfile);

module.exports = router;
