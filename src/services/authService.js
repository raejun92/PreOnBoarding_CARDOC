import { User } from '../db/user.js';

export const createUser = async (newbieData) => {
	return User.create(newbieData);
}

export const findByuserId = async (userId) => {
	return User.findOne({
		where: {userId}
	});
}