import 'express-async-errors';

let users = [
	{
		id: 'aaa',
		password: 'abc123',
	},
];

export const createUser = async (newbieData) => {
	users.push(newbieData);

	return newbieData;
}

