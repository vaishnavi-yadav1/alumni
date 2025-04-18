import express from 'express';
import { createPost, getJobs } from '../controllers/job.controller.js';
import { verifyToken } from '../utils/verifyAlumni.js';
const router =express.Router();

router.post('/create',verifyToken,createPost);
router.get('/listings',getJobs);
export default router;