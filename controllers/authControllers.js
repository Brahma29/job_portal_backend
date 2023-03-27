const User = require('../models/userModel');
const ErrorResponse = require('../utils/ErrorResponse');

exports.signUp = async (req, res, next) => {
  const { email } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new ErrorResponse('E-mail already registered', 400));
  }
  try {
    const user = await User.create(req.body);
    user.password = undefined;
    res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Validations
    if (!email) {
      return next(new ErrorResponse('Please add an email', 403));
    }
    if (!password) {
      return next(new ErrorResponse('Please add password', 403));
    }

    //Check user email
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return next(new ErrorResponse('Invalid Credentials', 403));
    }

    //Check password
    const isMatched = await userExists.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorResponse('Invalid Credentials', 403));
    }

    sendTokenResponse(userExists, 200, res);
  } catch (err) {
    next(err);
  }
};

const sendTokenResponse = async (user, codeStatus, res) => {
  const token = await user.getJwtToken();
  user.password = undefined;
  res
    .status(codeStatus)
    .cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    .json({ success: true, role: user.role, token });
};

exports.logout = (req, res, next) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: 'Logged out',
  });
};

exports.userProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');

  res.status(200).json({
    success: true,
    user,
  });
};
