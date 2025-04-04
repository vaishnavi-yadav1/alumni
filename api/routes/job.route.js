import express from 'express';
import { createPost } from '../controllers/job.controller.js';
import { verifyToken } from '../utils/verifyAlumni.js';
const router =express.Router();

router.post('/create',verifyToken,createPost);
export default router;