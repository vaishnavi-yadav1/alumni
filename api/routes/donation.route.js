import express from 'express';
import { verifyToken } from '../utils/verifyAlumni.js';
import {addDonation} from '../controllers/donation.contoller.js'
const router = express.Router();

router.post('/create',verifyToken,addDonation);
export default router;