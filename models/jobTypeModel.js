const mongoose = require('mongoose');

const JobTypeSchema = new mongoose.Schema(
  {
    jobTypeName: {
      type: String,
      trim: true,
      required: [true, 'Job Category is required'],
      maxlength: 70,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model('JobType', JobTypeSchema);
module.exports = Job;
