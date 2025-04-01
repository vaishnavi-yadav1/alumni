import express from 'express';
import {test,updateUser} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyAlumni.js';
const router=express.Router();

router.get('/test',test);
router.put('/update/:id',verifyToken,updateUser);
export default router;
