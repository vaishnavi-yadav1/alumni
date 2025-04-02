import express from "express";
import { verifyToken } from '../utils/verifyAlumni.js';
import { createJob, getJobs } from "../controllers/job.controller.js";
const router=express.Router();
router.post("/post",verifyToken,createJob);
router.get("/listings",getJobs);

export default router;