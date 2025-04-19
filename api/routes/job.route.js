import express from 'express';
import { createPost, deleteListing, getJobs } from '../controllers/job.controller.js';
import { verifyToken } from '../utils/verifyAlumni.js';
const router = express.Router();

router.post('/create', verifyToken, createPost);
router.get('/listings', getJobs);
router.delete('/delete/:id', verifyToken, deleteListing);

export default router;