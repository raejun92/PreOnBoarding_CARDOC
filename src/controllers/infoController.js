import 'express-async-errors';
import axios from 'axios';

import * as infoService from '../services/infoService.js';
import { statusCode } from '../utils/statusCode.js';
import { statusMessage } from '../utils/statusMessage.js';
import { findByuserId } from '../services/authService.js';
import { responseMessage } from '../utils/responseMessage.js';

const USER_INFO_NUMBER = 5;
const TIRE_INFO_NUMBER = 3;

// 타이어 정보
const createStoreInfo = ({id, trimId}, {frontTire, rearTire}) => {
	return {
		userId: id,
		trimId,
		frontWidth: frontTire[0],
		frontAspectRatio: frontTire[1],
		frontWheelSize: frontTire[2],
		rearWidth: rearTire[0],
		rearAspectRatio: rearTire[1],
		rearWheelSize: rearTire[2],
	};
};

// 타이어 정보 토큰화
const tokeNize = (str) => {
	let tireInfo = [];
	const strSplit = str.replace(/\/|R/g, ' ').split(' ');

	// ex: 123/45R67 R과 /를 반드시 포함
	if (!str.includes('/') || !str.includes('R'))
		return false;

	// ex: 123R45/67 예외처리
	if (str.indexOf('/') > str.indexOf('R')) 
		return false;
	
	// ex: 123/45R67 R과 /로 나누었을 때 123 45 67 3개 요소
	if (strSplit.length !== TIRE_INFO_NUMBER)
		return false;
	
	for (const element of strSplit) {
		// ex: ㄱ123/45R67 ㄱ과 같이 숫자가 아닌 값 예외처리
		if (isNaN(element))
			return false;
		tireInfo.push(Number(element));
	}
	return tireInfo;
}

// 사용자들 타이어 정보 저장
export const createUsersTire = async (req, res, next) => {
	const userInfos = req.body;
	const tireInfos = [];
	let duplicateUser = [];

	if (userInfos.length > USER_INFO_NUMBER)
		return res
			.status(statusCode.BAD_REQUEST)
			.json({ message: statusMessage.BAD_REQUEST+' '+responseMessage.INVALID_USER_NUMBER });

	// 유저 존재 유무 및 유저 중복 검사
	for (const {id: userId, trimId} of userInfos) {
		const isUser = await findByuserId(userId);
		
		if (!isUser)
			return res
				.status(statusCode.BAD_REQUEST)
				.json({ message: statusMessage.BAD_REQUEST+' '+responseMessage.NO_USER });

		if (!duplicateUser || !duplicateUser.includes(userId+'/'+trimId))
			duplicateUser.push(userId+'/'+trimId);
		else
			return res
				.status(statusCode.BAD_REQUEST)
				.json({ message: statusMessage.BAD_REQUEST+' '+responseMessage.DUPLICATE_USER, id, trimId });
	}

	for (const {id: userId, trimId} of userInfos) {
		const url = `https://dev.mycar.cardoc.co.kr/v1/trim/${trimId}`;
		let tireInfo = await axios.get(url).then(info => {
			const frontTire = info.data.spec.driving.frontTire.value;
			const rearTire = info.data.spec.driving.rearTire.value;

			return {frontTire, rearTire};
		}).catch(console.log);

		// trimId에 해당하는 데이터 없음
		if (!tireInfo)
			return res
				.status(statusCode.BAD_REQUEST)
				.json({ message: statusMessage.BAD_REQUEST+' '+responseMessage.NO_TRIMID, userId, trimId });

		// frontTire 정보 없거나 불일치
		if (!(tireInfo.frontTire = tokeNize(tireInfo.frontTire)))
			return res
				.status(statusCode.BAD_REQUEST)
				.json({ message: statusMessage.BAD_REQUEST+' '+responseMessage.INVALID_FRONTTIRE, userId, trimId });

		// rearTire 정보 없거나 불일치
		if (!(tireInfo.rearTire = tokeNize(tireInfo.rearTire)))
			return res
				.status(statusCode.BAD_REQUEST)
				.json({ message: statusMessage.BAD_REQUEST+' '+responseMessage.INVALID_REARTIRE, userId, trimId });

		tireInfos.push(tireInfo);
	}

	// db에 사용자가 소유한 타이어 정보 저장
	for (let index = 0; index < userInfos.length; index++) {
		const storeInfo = createStoreInfo(userInfos[index], tireInfos[index]);
	
		await infoService.createTireInfo(storeInfo);
	}


	return res.status(statusCode.OK).json({ message: statusMessage.OK });
};