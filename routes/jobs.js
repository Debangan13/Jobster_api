const express = require("express");
const router = express.Router();
const testUser = require("../middleware/testUser");

const {
	getAllJobs,
	getJob,
	createJob,
	updateJob,
	deleteJobs,
    showStatus
} = require("../controllers/jobs");

router.route("/").post(testUser, createJob).get(getAllJobs);
router.route("/stats").get(showStatus)
router
	.route("/:id")
	.get(getJob)
	.delete(testUser, deleteJobs)
	.patch(testUser, updateJob);

module.exports = router;
