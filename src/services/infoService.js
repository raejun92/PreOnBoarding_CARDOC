import 'express-async-errors';
import { Tire } from '../models/tire.js';

export const createTireInfo = async (storeInfo) => {
	// return Tire.create(storeInfo);
	return Tire
	.findOne({
		where: {
			userId: storeInfo.userId,
			trimId: storeInfo.trimId,
		}
	})
	.then(obj => {
		if (obj)
			return Tire.update(storeInfo, {
				where: {
					userId: storeInfo.userId,
					trimId: storeInfo.trimId,
				}
			});
			
		return Tire.create(storeInfo);
	});
}

export const getAllByuserId = async (userId) => {
	return Tire.findAll({
		attributes: { exclude: 'id' },
		where: { userId },
	});
}