import express from 'express';
import {deleteUser, test,updateUser} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyAlumni.js';
import { allAlumni,searchAlumni } from '../controllers/directory.controller.js';
const router=express.Router();

router.get('/test',test);
router.get("/directory",allAlumni);
router.get("/search", searchAlumni);
router.put('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser)
export default router;
  