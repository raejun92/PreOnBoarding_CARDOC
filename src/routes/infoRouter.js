import 'express-async-errors';
import express from 'express';

import * as infoController from '../controllers/infoController.js';

const router = express.Router();

router.post('/tires', infoController.createUsersTire);

export default router;