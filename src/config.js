import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined) {
	const value = process.env[key] ?? defaultValue;

	if (value == null) {
		throw new Error(`${key} is undefined`);
	}
	return value;
}

export const config = {
	db: {
		host: required('DB_HOST'),
		user: required('DB_USER'),
		password: required('DB_PASSWORD'),
		database: required('DB_DATABASE'),
	},
}