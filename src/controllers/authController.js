import 'express-async-errors';

import * as authService from '../services/authService.js';

export const signup = async (req, res, next) => {
	const { userId, password } = req.body;

	const newbie = {
		userId,
		password,
	};

	const user = await authService.createUser(newbie);

	return res.status(200).json({ user });
};

export const login = async (req, res, next) => {
	const { userId, password } = req.body;
	
	console.log('login');
	res.status(200).json({});
};