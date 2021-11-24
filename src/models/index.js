import { Sequelize } from 'sequelize';

import { User } from './user.js';
import { config } from '../config.js';

export const sequelize = new Sequelize(
	config.db.database,
	config.db.user,
	config.db.password,
	{
		host: config.db.host,
		dialect: 'mysql',
		logging: false,
	}
);

User(sequelize);
