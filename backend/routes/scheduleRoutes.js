import express from 'express';
import { getSchedule, updateSchedule } from '../controllers/scheduleController.js';

const router = express.Router();

router.get('/schedule', getSchedule);
router.post('/schedule', updateSchedule);

export default router;
