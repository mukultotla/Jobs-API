
const getAllJobs = async (req, res) => {
    res.json({
      msg: "Get all jobs",
    });
  };
  const getJob = async (req, res) => {
    res.json({
      msg: "Get job",
    });
  };
  const createJob = async (req, res) => {
    res.json({
      msg: "Create job",
    });
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
  