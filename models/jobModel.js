const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Title is required'],
      maxlength: 70,
    },

    description: {
      type: String,
      trim: true,
      required: [true, 'Description is required'],
      maxlength: 70,
    },

    salary: {
      type: String,
      trim: true,
      required: [true, 'Salary is required'],
    },

    location: {
      type: String,
    },

    available: {
      type: Boolean,
      default: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobType',
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', JobSchema);
module.exports = Job;
