import 'express-async-errors';
import jwt from 'jsonwebtoken';

import { config } from '../config.js'
import { findByuserId } from '../services/authService.js';
import { statusCode } from '../utils/statusCode.js';
import { statusMessage } from '../utils/statusMessage.js';

export const isAuth = async (req, res, next) => {
	const authHeader = req.get('Authorization');
	
	if (!(authHeader && authHeader.startsWith('Bearer ')))
		return res
			.status(statusCode.AUTHORIZED)
			.json({ message: statusMessage.AUTHORIZED });
	const token = authHeader.split(' ')[1];
	jwt.verify(
		token,
		config.jwt.secretKey,
		async (err, decoded) => {
			if (err)
				return res
					.status(statusCode.AUTHORIZED)
					.json({ message: statusMessage.AUTHORIZED });
			
			const isUser = await findByuserId(decoded.id);

			if (!isUser)
			return res
				.status(statusCode.AUTHORIZED)
				.json({ message: statusMessage.AUTHORIZED });
				
			req.userId = isUser.id;
			req.token = token;
			next();
		}
	);
};