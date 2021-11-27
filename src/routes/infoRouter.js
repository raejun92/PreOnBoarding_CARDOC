import 'express-async-errors';
import express from 'express';

import * as infoController from '../controllers/infoController.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/tires', isAuth, infoController.createUsersTire);

export default router;