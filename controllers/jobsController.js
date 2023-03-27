const Job = require('../models/jobModel');
const JobType = require('../models/jobTypeModel');
const ErrorResponse = require('../utils/ErrorResponse');

//create job
exports.createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      salary: req.body.salary,
      jobType: req.body.jobType,
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      job,
    });
  } catch (err) {
    next(err);
  }
};

//single job
exports.singleJob = async (req, res, next) => {
  try {
    const job = await Job.find(req.params.id);

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (err) {
    next(err);
  }
};

//update job
exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate('jobType', 'jobTypeName')
      .populate('user', 'firstName lastName');

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (err) {
    next(err);
  }
};

//show jobs
exports.showJobs = async (req, res, next) => {
  //enable search
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  //enable filter by category
  let ids = [];
  const jobTypeCategory = await JobType.find({}, { _id: 1 });
  jobTypeCategory.forEach((type) => {
    ids.push(type._id);
  });

  let cat = req.query.cat;
  let categ = cat !== '' ? cat : ids;

  //jobs by location
  let location = [];

  const jobByLocation = await Job.find({}, { location: 1 });
  jobByLocation.forEach((each) => {
    location.push(each.location);
  });
  let setUniqueLocation = [...new Set(location)];

  let loc = req.query.location;
  let locationFilter = loc !== '' ? loc : setUniqueLocation;

  //enable pagination
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Job.find({
    ...keyword,
    jobType: categ,
    location: locationFilter,
  }).countDocuments();

  try {
    const jobs = await Job.find({
      ...keyword,
      jobType: categ,
      location: locationFilter,
    })
      .sort({ createdAt: -1 })
      .skip(pageSize * page - 1)
      .limit(pageSize);

    return res.status(200).json({
      success: true,
      jobs,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  } catch (err) {
    next(err);
  }
};
