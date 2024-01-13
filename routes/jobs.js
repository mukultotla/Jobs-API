const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

const { Router } = require("express");
const router = Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).put(updateJob).delete(deleteJob);

module.exports = router;
