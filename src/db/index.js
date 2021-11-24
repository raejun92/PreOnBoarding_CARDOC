import { config } from '../config.js';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
	config.db.database,
	config.db.user,
	config.db.password,
	{
		host: config.db.host,
		dialect: 'mysql',
		logging: true,
	}
);

