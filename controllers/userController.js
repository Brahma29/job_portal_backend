const User = require('../models/userModel');
const ErrorResponse = require('../utils/ErrorResponse');

//load all user
exports.allUsers = async (req, res, next) => {
  //enable pagination
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await User.find({}).estimatedDocumentCount();

  try {
    const users = await User.find({})
      .sort({ createdAt: -1 })
      .select('-password')
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.status(200).json({
      success: true,
      users,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
    next();
  } catch (err) {
    return next(err);
  }
};

//single user
exports.singleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      user,
    });
    next();
  } catch (err) {
    return next(err);
  }
};

//Edit user
exports.editUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      user,
    });
    next();
  } catch (err) {
    return next(err);
  }
};

//delete user
exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.params.id);

    res.status(200).json({
      success: true,
      message: 'User removed',
    });
    next();
  } catch (err) {
    return next(err);
  }
};

//job history
exports.createUserJobHistory = async (req, res, next) => {
  const { title, description, salary, location } = req.body;
  try {
    const currentUser = await User.findOne({ _id: req.user._id });
    if (!currentUser) {
      return next(new ErrorResponse('You must be logged in', 401));
    }

    const addJobHistory = {
      title,
      description,
      salary,
      location,
      user: req.user._id,
    };

    currentUser.jobHistory.push(addJobHistory);
    await currentUser.save();
    currentUser.password = undefined;
    res.status(200).json({
      success: true,
      currentUser,
    });
    next();
  } catch (err) {
    return next(err);
  }
};
