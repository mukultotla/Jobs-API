const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ createdBy: userId, _id: jobId });
  if (!job) {
    res.status(StatusCodes.NOT_FOUND).json({
      msg: "Job not found",
    });
  }
  res.status(StatusCodes.OK).json({
    job,
  });
};
const createJob = async (req, res) => {
  // Input validation is written at model
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = async (req, res) => {
  res.json({
    msg: "Update job",
  });
};
const deleteJob = async (req, res) => {
  res.json({
    msg: "Delete job",
  });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
