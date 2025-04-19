import express from 'express';
import { verifyToken } from '../utils/verifyAlumni.js';
import { createEvent, getAllEvents,deleteEvent } from '../controllers/event.contoller.js';
const router=express.Router();

router.post("/create",verifyToken,createEvent)
router.get("/all",getAllEvents);
router.delete('/delete/:id', verifyToken, deleteEvent);
export default router;