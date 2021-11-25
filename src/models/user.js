import SQ from 'sequelize';
import { sequelize } from './index.js';

const DataTypes = SQ.DataTypes;

export class User extends SQ.Model {};

User.init({
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
}, {sequelize, ModelName: 'user', timestamps: false});
