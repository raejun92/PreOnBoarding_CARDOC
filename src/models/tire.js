import SQ from 'sequelize';
import { sequelize } from './index.js';
import { User } from './user.js';

const DataTypes = SQ.DataTypes;

export class Tire extends SQ.Model {};

Tire.init({
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	trimId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	frontWidth: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	frontAspectRatio: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	frontWheelSize: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	rearWidth: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	rearAspectRatio: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	rearWheelSize: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
}, {sequelize, ModelName: 'tire', timestamps: false});

Tire.belongsTo(User, {
	foreignKey: {
		name: 'userId',
		allowNull: false,
	},
	onUpdate: 'CASCADE'
});