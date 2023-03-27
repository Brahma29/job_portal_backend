const JobType = require('../models/jobTypeModel');
const ErrorResponse = require('../utils/ErrorResponse');

//create job type
exports.createJobType = async (req, res, next) => {
  try {
    const jobT = await JobType.create({
      jobTypeName: req.body.jobTypeName,
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      jobT,
    });
  } catch (err) {
    next(err);
  }
};

//get all job types
exports.allJobTypes = async (req, res, next) => {
  try {
    const jobTypes = await JobType.find({});

    return res.status(200).json({
      success: true,
      jobTypes,
    });
  } catch (err) {
    next(err);
  }
};

//Update job types
exports.updateJobType = async (req, res, next) => {
  try {
    const jobType = await JobType.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      jobType,
    });
  } catch (err) {
    next(err);
  }
};

//Delete job type by id
exports.deleteJobType = async (req, res, next) => {
  try {
    await JobType.findOneAndRemove(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Job Type deleted',
    });
  } catch (err) {
    next(err);
  }
};
