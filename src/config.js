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
	port: parseInt(required('PORT', 4000)),
	db: {
		host: required('DB_HOST'),
		user: required('DB_USER'),
		password: required('DB_PASSWORD'),
		database: required('DB_DATABASE'),
	},
	bcrypt: {
		saltRounds: parseInt(required('BCRYPT_SALT_ROUND', 10)),
	},
	jwt: {
		secretKey: required('JWT_SECRETKEY'),
		expiresIn: parseInt(required('JWT_EXPIRESIN', 86400)),
	},
}