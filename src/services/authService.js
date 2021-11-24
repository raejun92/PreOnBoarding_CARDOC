import { User } from '../db/user.js';

export async function createUser(newbieData) {
	return User.create(newbieData).then();
}

