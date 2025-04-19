import express from 'express';
import { verifyToken } from '../utils/verifyAlumni.js';
import { createEvent } from '../controllers/event.contoller.js';
const router=express.Router();

router.post("/create",verifyToken,createEvent)
export default router;