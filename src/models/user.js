import SQ from 'sequelize';

const DataTypes = SQ.DataTypes;

export const User = (sequelize) => sequelize.define('user', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
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
});