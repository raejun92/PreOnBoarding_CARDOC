import SQ from 'sequelize';
import { sequelize } from './index.js';

const DataTypes = SQ.DataTypes;

export class User extends SQ.Model {};

User.init({
	userId: {
		type: DataTypes.STRING(64),
		allowNull: false,
		primaryKey: true,
	},
	password: {
		type: DataTypes.STRING(64),
		allowNull: false,
	}
}, {sequelize, ModelName: 'user', timestamps: false});
