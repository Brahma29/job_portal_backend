const ErrorResponse = require('../utils/ErrorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//check if user is authenticated
exports.isAuthenticated = async (req, res, next) => {
  let token;
  console.log({ req: req.headers });
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log({ token });
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error('Not Authorized, Token Failed.');
    }
  }
  // if (!token) {
  //   res.status(401);
  //   throw new Error('Not authorized! No token found.');
  // }

  // const { token } = req.cookies;
  // if (!token) {
  //   return next(new ErrorResponse('Not authorized to access this route', 401));
  // }
  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = await User.findById(decoded.id);
  //   next();
  // } catch (err) {
  //   return next(new ErrorResponse('Not Authorized to access this route', 401));
  // }
};

//Checking if user is admin
exports.isAdmin = async (req, res, next) => {
  if (req.user.role === 0) {
    return next(new ErrorResponse('Access denied, you must be an admin', 401));
  }
  next();
};
