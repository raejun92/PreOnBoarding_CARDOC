import SQ from 'sequelize';
import { sequelize } from './index.js';

const DataTypes = SQ.DataTypes;

export const User = sequelize.define('user', {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	userId: {
		type: DataTypes.STRING(64),
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING(64),
		allowNull: false,
	}
}, {timestamps: false});