import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAllJobs, getJobById, getJobPostedByRecruiter, postJob } from "../controllers/job.controller.js";


const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/getRecruiterJobs").get(isAuthenticated, getJobPostedByRecruiter);


export default router;