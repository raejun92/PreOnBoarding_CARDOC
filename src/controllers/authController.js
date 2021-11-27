import 'express-async-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as authService from '../services/authService.js';
import { statusCode } from '../utils/statusCode.js';
import { statusMessage } from '../utils/statusMessage.js';
import { config } from '../config.js';
import { responseMessage } from '../utils/responseMessage.js';

const createJwtToken = (id) => {
	return jwt.sign({id}, config.jwt.secretKey, {expiresIn: config.jwt.expiresIn});
};

// 회원가입
export const signup = async (req, res, next) => {
	const { userId, password } = req.body;
	const isUser = await authService.findByuserId(userId);

	if (isUser)
		return res
			.status(statusCode.BAD_REQUEST)
			.json({ meesage: statusMessage.BAD_REQUEST+' '+responseMessage.EXIST_USER });

	const encryptedPassword = await bcrypt.hash(password, config.bcrypt.saltRounds);

	const newbie = await authService.createUser({
		userId,
		password: encryptedPassword,
	});

	return res
		.status(statusCode.OK)
		.json({ message: statusMessage.OK });
};

// 로그인
export const login = async (req, res, next) => {
	const { userId, password } = req.body;
	
	const isUser = await authService.findByuserId(userId);

	if (!isUser)
		return res
			.status(statusCode.BAD_REQUEST)
			.json({ message: statusMessage.BAD_REQUEST+' '+responseMessage.INVALID_LOGIN });
	
	const isValidPassword = await bcrypt.compare(password, isUser.password);

	if (!isValidPassword)
		return res
			.status(statusCode.BAD_REQUEST)
			.json({ message: statusMessage.BAD_REQUEST+' '+responseMessage.INVALID_LOGIN });
	
	const token = createJwtToken(isUser.userId);
	
	// const cookieOption = {
	// 	domain: req.hostname,
	// 	expires: new Date(config.cookie.expires),
	// }

	return res
		// .cookie(config.cookie.name, config.cookie.prefix+token, cookieOption)
		.status(statusCode.OK)
		.json({ token, message: statusMessage.OK });
};