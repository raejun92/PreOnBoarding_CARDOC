import express from 'express';
import 'express-async-errors';

import * as authController from '../controllers/authController.js';


const router = express.Router();

// router.post('/login', authController.login);

router.post('/signup', authController.signup);

export default router;

